<?php

namespace Database\Factories;

use App\Models\AlertNotification;
use App\Models\ForeignNational;
use App\Models\ForeignOrganization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AlertNotification>
 */
class AlertNotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\AlertNotification>
     */
    protected $model = AlertNotification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $alertTypes = ['permit_expiring', 'license_expiring', 'overstay_detected', 'document_missing', 'status_change'];
        $severities = ['low', 'medium', 'high', 'critical'];
        $statuses = ['unread', 'read', 'acknowledged', 'resolved'];

        // Randomly choose between ForeignNational and ForeignOrganization
        $alertableType = fake()->randomElement([ForeignNational::class, ForeignOrganization::class]);
        
        return [
            'alertable_type' => $alertableType,
            'alertable_id' => 1, // This will be overridden in seeders with actual IDs
            'alert_type' => fake()->randomElement($alertTypes),
            'title' => fake()->sentence(4),
            'message' => fake()->paragraph(),
            'severity' => fake()->randomElement($severities),
            'status' => fake()->randomElement($statuses),
            'due_date' => fake()->optional()->dateTimeBetween('now', '+30 days'),
            'acknowledged_at' => null,
            'resolved_at' => null,
        ];
    }

    /**
     * Create an alert for permit expiring.
     */
    public function permitExpiring(): static
    {
        return $this->state(fn (array $attributes) => [
            'alert_type' => 'permit_expiring',
            'title' => 'Permit Expiring Soon',
            'message' => 'Foreign national permit is expiring within 30 days.',
            'severity' => 'high',
            'status' => 'unread',
        ]);
    }

    /**
     * Create a critical alert.
     */
    public function critical(): static
    {
        return $this->state(fn (array $attributes) => [
            'severity' => 'critical',
            'status' => 'unread',
        ]);
    }

    /**
     * Create an unread alert.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'unread',
        ]);
    }
}