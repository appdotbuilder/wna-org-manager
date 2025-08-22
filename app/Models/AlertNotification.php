<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * App\Models\AlertNotification
 *
 * @property int $id
 * @property string $alertable_type
 * @property int $alertable_id
 * @property string $alert_type
 * @property string $title
 * @property string $message
 * @property string $severity
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property \Illuminate\Support\Carbon|null $acknowledged_at
 * @property \Illuminate\Support\Carbon|null $resolved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $alertable
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification query()
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification unread()
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification critical()
 * @method static \Illuminate\Database\Eloquent\Builder|AlertNotification high()
 * @method static \Database\Factories\AlertNotificationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AlertNotification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'alertable_type',
        'alertable_id',
        'alert_type',
        'title',
        'message',
        'severity',
        'status',
        'due_date',
        'acknowledged_at',
        'resolved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'datetime',
        'acknowledged_at' => 'datetime',
        'resolved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the parent alertable model.
     */
    public function alertable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to only include unread alerts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    /**
     * Scope a query to only include critical alerts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCritical($query)
    {
        return $query->where('severity', 'critical');
    }

    /**
     * Scope a query to only include high priority alerts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHigh($query)
    {
        return $query->where('severity', 'high');
    }

    /**
     * Mark the alert as acknowledged.
     *
     * @return void
     */
    public function acknowledge(): void
    {
        $this->update([
            'status' => 'acknowledged',
            'acknowledged_at' => now(),
        ]);
    }

    /**
     * Mark the alert as resolved.
     *
     * @return void
     */
    public function resolve(): void
    {
        $this->update([
            'status' => 'resolved',
            'resolved_at' => now(),
        ]);
    }
}