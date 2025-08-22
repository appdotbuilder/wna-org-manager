<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AlertNotification;
use App\Models\ForeignNational;
use App\Models\ForeignOrganization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WnaDashboardController extends Controller
{
    /**
     * Display the main WNA dashboard.
     */
    public function index()
    {
        // Get key statistics
        $stats = [
            'total_foreign_nationals' => ForeignNational::count(),
            'active_foreign_nationals' => ForeignNational::active()->count(),
            'expired_permits' => ForeignNational::expired()->count(),
            'overstay_cases' => ForeignNational::overstay()->count(),
            'total_organizations' => ForeignOrganization::count(),
            'active_organizations' => ForeignOrganization::active()->count(),
            'critical_alerts' => AlertNotification::critical()->unread()->count(),
            'high_alerts' => AlertNotification::high()->unread()->count(),
        ];

        // Get expiring permits (next 30 days)
        $expiringPermits = ForeignNational::expiringWithinDays(30)
            ->orderBy('permit_expiry_date')
            ->limit(10)
            ->get();

        // Get recent alerts
        $recentAlerts = AlertNotification::with('alertable')
            ->unread()
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        // Get country distribution
        $countryData = ForeignNational::select('country_of_origin', DB::raw('count(*) as total'))
            ->groupBy('country_of_origin')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        // Get permit type distribution
        $permitTypeData = ForeignNational::select('permit_type', DB::raw('count(*) as total'))
            ->groupBy('permit_type')
            ->orderByDesc('total')
            ->get();

        // Get status distribution
        $statusData = ForeignNational::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        // Get monthly trends (last 6 months) - SQLite compatible
        $monthlyTrends = ForeignNational::select(
                DB::raw('strftime("%Y-%m", created_at) as month'),
                DB::raw('count(*) as registrations')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy(DB::raw('strftime("%Y-%m", created_at)'))
            ->orderBy('month')
            ->get();

        return Inertia::render('wna-dashboard', [
            'stats' => $stats,
            'expiringPermits' => $expiringPermits,
            'recentAlerts' => $recentAlerts,
            'countryData' => $countryData,
            'permitTypeData' => $permitTypeData,
            'statusData' => $statusData,
            'monthlyTrends' => $monthlyTrends,
        ]);
    }


}