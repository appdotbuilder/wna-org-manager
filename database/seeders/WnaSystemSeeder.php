<?php

namespace Database\Seeders;

use App\Models\AlertNotification;
use App\Models\ForeignNational;
use App\Models\ForeignOrganization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WnaSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Foreign Nationals
        $foreignNationals = collect([
            ForeignNational::factory(15)->active()->create(),
            ForeignNational::factory(5)->expiringSoon()->create(),
            ForeignNational::factory(3)->expired()->create(),
            ForeignNational::factory(2)->overstay()->create(),
        ])->flatten();

        // Create Foreign Organizations
        $organizations = collect([
            ForeignOrganization::factory(8)->active()->create(),
            ForeignOrganization::factory(2)->licenseExpiringSoon()->create(),
        ])->flatten();

        // Create alerts for expiring permits
        $expiringNationals = $foreignNationals->where('status', 'active')
            ->where('permit_expiry_date', '<=', now()->addDays(30));
            
        foreach ($expiringNationals as $national) {
            AlertNotification::factory()->create([
                'alertable_type' => ForeignNational::class,
                'alertable_id' => $national->id,
                'alert_type' => 'permit_expiring',
                'title' => 'Permit Expiring Soon',
                'message' => "Permit for {$national->full_name} expires on " . $national->permit_expiry_date->format('Y-m-d'),
                'severity' => 'high',
                'status' => 'unread',
                'due_date' => $national->permit_expiry_date,
            ]);
        }

        // Create alerts for overstay cases
        $overstayNationals = $foreignNationals->where('status', 'overstay');
        
        foreach ($overstayNationals as $national) {
            AlertNotification::factory()->create([
                'alertable_type' => ForeignNational::class,
                'alertable_id' => $national->id,
                'alert_type' => 'overstay_detected',
                'title' => 'Overstay Detected',
                'message' => "Overstay case detected for {$national->full_name}. Permit expired on " . $national->permit_expiry_date->format('Y-m-d'),
                'severity' => 'critical',
                'status' => 'unread',
            ]);
        }

        // Create alerts for organization licenses
        $expiringOrgs = $organizations->where('status', 'active')
            ->whereNotNull('license_expiry_date')
            ->where('license_expiry_date', '<=', now()->addDays(30));
            
        foreach ($expiringOrgs as $org) {
            AlertNotification::factory()->create([
                'alertable_type' => ForeignOrganization::class,
                'alertable_id' => $org->id,
                'alert_type' => 'license_expiring',
                'title' => 'License Expiring Soon',
                'message' => "License for {$org->organization_name} expires on " . $org->license_expiry_date->format('Y-m-d'),
                'severity' => 'medium',
                'status' => 'unread',
                'due_date' => $org->license_expiry_date,
            ]);
        }

        // Create some additional random alerts
        AlertNotification::factory(5)->critical()->create([
            'alertable_type' => ForeignNational::class,
            'alertable_id' => $foreignNationals->random()->id,
        ]);

        AlertNotification::factory(3)->create([
            'alertable_type' => ForeignOrganization::class,
            'alertable_id' => $organizations->random()->id,
            'severity' => 'medium',
        ]);

        $this->command->info('WNA System data seeded successfully!');
        $this->command->info("Created {$foreignNationals->count()} foreign nationals");
        $this->command->info("Created {$organizations->count()} foreign organizations");
        $this->command->info('Created ' . AlertNotification::count() . ' alert notifications');
    }
}