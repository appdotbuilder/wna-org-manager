<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\ForeignOrganization
 *
 * @property int $id
 * @property string $organization_name
 * @property string $registration_number
 * @property string $country_of_origin
 * @property string $organization_type
 * @property string $legal_status
 * @property \Illuminate\Support\Carbon $registration_date
 * @property \Illuminate\Support\Carbon|null $license_expiry_date
 * @property string $business_address
 * @property string $contact_person
 * @property string $contact_phone
 * @property string $contact_email
 * @property string $activity_type
 * @property string $activity_description
 * @property string $status
 * @property array|null $supporting_documents
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AlertNotification[] $alerts
 * @property-read int|null $alerts_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignOrganization newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignOrganization newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignOrganization query()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignOrganization active()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignOrganization licenseExpiringWithinDays(int $days)
 * @method static \Database\Factories\ForeignOrganizationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ForeignOrganization extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'organization_name',
        'registration_number',
        'country_of_origin',
        'organization_type',
        'legal_status',
        'registration_date',
        'license_expiry_date',
        'business_address',
        'contact_person',
        'contact_phone',
        'contact_email',
        'activity_type',
        'activity_description',
        'status',
        'supporting_documents',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'registration_date' => 'date',
        'license_expiry_date' => 'date',
        'supporting_documents' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all alert notifications for this foreign organization.
     */
    public function alerts(): MorphMany
    {
        return $this->morphMany(AlertNotification::class, 'alertable');
    }

    /**
     * Scope a query to only include active organizations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to get licenses expiring within specified days.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLicenseExpiringWithinDays($query, $days = 30)
    {
        return $query->where('license_expiry_date', '<=', now()->addDays($days))
                     ->where('license_expiry_date', '>=', now())
                     ->where('status', 'active')
                     ->whereNotNull('license_expiry_date');
    }

    /**
     * Check if the license is expired.
     *
     * @return bool
     */
    public function isLicenseExpired(): bool
    {
        return $this->license_expiry_date && $this->license_expiry_date->isPast();
    }

    /**
     * Get days until license expiry.
     *
     * @return int|null
     */
    public function daysUntilLicenseExpiry(): ?int
    {
        if (!$this->license_expiry_date) {
            return null;
        }
        
        return (int) now()->diffInDays($this->license_expiry_date, false);
    }
}