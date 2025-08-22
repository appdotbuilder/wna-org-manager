<?php

namespace Database\Factories;

use App\Models\ForeignOrganization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForeignOrganization>
 */
class ForeignOrganizationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ForeignOrganization>
     */
    protected $model = ForeignOrganization::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'China', 'India', 'Brazil', 'Canada', 'Australia'];
        $organizationTypes = ['company', 'ngo', 'embassy', 'consulate', 'educational', 'religious', 'other'];
        $legalStatuses = ['registered', 'licensed', 'accredited', 'temporary', 'suspended', 'revoked'];
        $activityTypes = ['commercial', 'educational', 'humanitarian', 'diplomatic', 'religious', 'research', 'development'];
        $statuses = ['active', 'inactive', 'suspended', 'closed'];

        $registrationDate = fake()->dateTimeBetween('-5 years', '-1 month');
        $licenseExpiryDate = fake()->optional()->dateTimeBetween($registrationDate, '+3 years');

        return [
            'organization_name' => fake()->company(),
            'registration_number' => fake()->unique()->regexify('ORG[0-9]{8}'),
            'country_of_origin' => fake()->randomElement($countries),
            'organization_type' => fake()->randomElement($organizationTypes),
            'legal_status' => fake()->randomElement($legalStatuses),
            'registration_date' => $registrationDate,
            'license_expiry_date' => $licenseExpiryDate,
            'business_address' => fake()->address(),
            'contact_person' => fake()->name(),
            'contact_phone' => fake()->phoneNumber(),
            'contact_email' => fake()->companyEmail(),
            'activity_type' => fake()->randomElement($activityTypes),
            'activity_description' => fake()->paragraph(),
            'status' => fake()->randomElement($statuses),
            'supporting_documents' => [
                'registration_certificate' => 'reg_cert_' . fake()->uuid() . '.pdf',
                'license_document' => 'license_' . fake()->uuid() . '.pdf',
            ],
            'notes' => fake()->optional()->paragraph(),
        ];
    }

    /**
     * Indicate that the organization's license is expiring soon.
     */
    public function licenseExpiringSoon(): static
    {
        return $this->state(fn (array $attributes) => [
            'license_expiry_date' => fake()->dateTimeBetween('now', '+30 days'),
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the organization is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}