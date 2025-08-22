<?php

use App\Models\ForeignNational;
use App\Models\ForeignOrganization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('wna dashboard loads successfully', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        $page->component('wna-dashboard')
             ->has('stats')
             ->has('expiringPermits')
             ->has('recentAlerts')
             ->has('countryData')
             ->has('permitTypeData')
             ->has('statusData');
    });
});

test('foreign nationals can be listed', function () {
    $user = User::factory()->create();
    ForeignNational::factory(5)->create();

    $response = $this->actingAs($user)->get('/foreign-nationals');

    $response->assertStatus(200);
    $response->assertInertia(function ($page) {
        $page->component('foreign-nationals/index')
             ->has('foreignNationals');
    });
});

test('foreign national can be created', function () {
    $user = User::factory()->create();
    
    $data = [
        'full_name' => 'John Doe',
        'passport_number' => 'AB1234567',
        'country_of_origin' => 'United States',
        'nationality' => 'American',
        'date_of_birth' => '1990-01-01',
        'gender' => 'male',
        'permit_number' => 'WP12345678',
        'permit_type' => 'work',
        'permit_issue_date' => '2024-01-01',
        'permit_expiry_date' => '2025-01-01',
        'activity_type' => 'employee',
        'current_address' => '123 Main St, City',
        'status' => 'active',
    ];

    $response = $this->actingAs($user)->post('/foreign-nationals', $data);

    $response->assertRedirect();
    $this->assertDatabaseHas('foreign_nationals', [
        'full_name' => 'John Doe',
        'passport_number' => 'AB1234567',
    ]);
});

test('foreign organization can be created', function () {
    $user = User::factory()->create();
    
    $data = [
        'organization_name' => 'ACME Corp',
        'registration_number' => 'ORG12345678',
        'country_of_origin' => 'United States',
        'organization_type' => 'company',
        'legal_status' => 'registered',
        'registration_date' => '2024-01-01',
        'business_address' => '123 Business St, City',
        'contact_person' => 'Jane Smith',
        'contact_phone' => '+1234567890',
        'contact_email' => 'contact@acme.com',
        'activity_type' => 'commercial',
        'activity_description' => 'Technology consulting services',
        'status' => 'active',
    ];

    $response = $this->actingAs($user)->post('/foreign-organizations', $data);

    $response->assertRedirect();
    $this->assertDatabaseHas('foreign_organizations', [
        'organization_name' => 'ACME Corp',
        'registration_number' => 'ORG12345678',
    ]);
});

test('foreign national model has required scopes', function () {
    ForeignNational::factory()->active()->create();
    ForeignNational::factory()->expired()->create();
    ForeignNational::factory()->overstay()->create();

    expect(ForeignNational::active()->count())->toBeGreaterThanOrEqual(1);
    expect(ForeignNational::expired()->count())->toBeGreaterThanOrEqual(1);
    expect(ForeignNational::overstay()->count())->toBeGreaterThanOrEqual(1);
});

test('foreign national expiry methods work', function () {
    $expired = ForeignNational::factory()->create([
        'permit_expiry_date' => now()->subDays(10),
    ]);

    $active = ForeignNational::factory()->create([
        'permit_expiry_date' => now()->addDays(10),
    ]);

    expect($expired->isExpired())->toBeTrue();
    expect($active->isExpired())->toBeFalse();
    expect($active->daysUntilExpiry())->toBeGreaterThan(0);
    expect($expired->daysUntilExpiry())->toBeLessThan(0);
});