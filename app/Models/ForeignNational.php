<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\ForeignNational
 *
 * @property int $id
 * @property string $full_name
 * @property string $passport_number
 * @property string $country_of_origin
 * @property string $nationality
 * @property \Illuminate\Support\Carbon $date_of_birth
 * @property string $gender
 * @property string $permit_number
 * @property string $permit_type
 * @property \Illuminate\Support\Carbon $permit_issue_date
 * @property \Illuminate\Support\Carbon $permit_expiry_date
 * @property string $activity_type
 * @property string $current_address
 * @property string|null $phone
 * @property string|null $email
 * @property string|null $employer_organization
 * @property string $status
 * @property array|null $supporting_documents
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AlertNotification[] $alerts
 * @property-read int|null $alerts_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational query()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational active()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational expired()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational overstay()
 * @method static \Illuminate\Database\Eloquent\Builder|ForeignNational expiringWithinDays(int $days)
 * @method static \Database\Factories\ForeignNationalFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ForeignNational extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'passport_number',
        'country_of_origin',
        'nationality',
        'date_of_birth',
        'gender',
        'permit_number',
        'permit_type',
        'permit_issue_date',
        'permit_expiry_date',
        'activity_type',
        'current_address',
        'phone',
        'email',
        'employer_organization',
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
        'date_of_birth' => 'date',
        'permit_issue_date' => 'date',
        'permit_expiry_date' => 'date',
        'supporting_documents' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all alert notifications for this foreign national.
     */
    public function alerts(): MorphMany
    {
        return $this->morphMany(AlertNotification::class, 'alertable');
    }

    /**
     * Scope a query to only include active foreign nationals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include expired foreign nationals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExpired($query)
    {
        return $query->where('status', 'expired');
    }

    /**
     * Scope a query to only include overstay foreign nationals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOverstay($query)
    {
        return $query->where('status', 'overstay');
    }

    /**
     * Scope a query to get permits expiring within specified days.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExpiringWithinDays($query, $days = 30)
    {
        return $query->where('permit_expiry_date', '<=', now()->addDays($days))
                     ->where('permit_expiry_date', '>=', now())
                     ->whereIn('status', ['active']);
    }

    /**
     * Check if the permit is expired.
     *
     * @return bool
     */
    public function isExpired(): bool
    {
        return $this->permit_expiry_date->isPast();
    }

    /**
     * Check if the person is overstaying.
     *
     * @return bool
     */
    public function isOverstaying(): bool
    {
        return $this->permit_expiry_date->isPast() && $this->status === 'overstay';
    }

    /**
     * Get days until permit expiry.
     *
     * @return int
     */
    public function daysUntilExpiry(): int
    {
        return (int) now()->diffInDays($this->permit_expiry_date, false);
    }
}