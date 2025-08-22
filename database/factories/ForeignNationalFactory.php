<?php

namespace Database\Factories;

use App\Models\ForeignNational;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForeignNational>
 */
class ForeignNationalFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ForeignNational>
     */
    protected $model = ForeignNational::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'China', 'India', 'Brazil', 'Canada', 'Australia'];
        $permitTypes = ['work', 'study', 'visit', 'business', 'family', 'diplomatic'];
        $activityTypes = ['employee', 'student', 'investor', 'researcher', 'diplomat', 'tourist', 'family_reunion'];
        $statuses = ['active', 'expired', 'overstay', 'cancelled'];

        $permitIssueDate = fake()->dateTimeBetween('-2 years', '-1 month');
        $permitExpiryDate = fake()->dateTimeBetween($permitIssueDate, '+2 years');

        return [
            'full_name' => fake()->name(),
            'passport_number' => fake()->unique()->regexify('[A-Z]{2}[0-9]{7}'),
            'country_of_origin' => fake()->randomElement($countries),
            'nationality' => fake()->randomElement($countries),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-18 years'),
            'gender' => fake()->randomElement(['male', 'female']),
            'permit_number' => fake()->unique()->regexify('WP[0-9]{8}'),
            'permit_type' => fake()->randomElement($permitTypes),
            'permit_issue_date' => $permitIssueDate,
            'permit_expiry_date' => $permitExpiryDate,
            'activity_type' => fake()->randomElement($activityTypes),
            'current_address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'employer_organization' => fake()->optional()->company(),
            'status' => fake()->randomElement($statuses),
            'supporting_documents' => [
                'passport_copy' => 'passport_' . fake()->uuid() . '.pdf',
                'permit_document' => 'permit_' . fake()->uuid() . '.pdf',
            ],
            'notes' => fake()->optional()->paragraph(),
        ];
    }

    /**
     * Indicate that the person's permit is expiring soon.
     */
    public function expiringSoon(): static
    {
        return $this->state(fn (array $attributes) => [
            'permit_expiry_date' => fake()->dateTimeBetween('+1 day', '+30 days'),
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the person is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'permit_expiry_date' => fake()->dateTimeBetween('+1 month', '+2 years'),
        ]);
    }

    /**
     * Indicate that the person is overstaying.
     */
    public function overstay(): static
    {
        return $this->state(fn (array $attributes) => [
            'permit_expiry_date' => fake()->dateTimeBetween('-6 months', '-1 day'),
            'status' => 'overstay',
        ]);
    }

    /**
     * Indicate that the person's permit is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'permit_expiry_date' => fake()->dateTimeBetween('-1 year', '-1 day'),
            'status' => 'expired',
        ]);
    }
}