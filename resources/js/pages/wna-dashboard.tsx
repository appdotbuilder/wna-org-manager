import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from '@inertiajs/react';

interface Stats {
    total_foreign_nationals: number;
    active_foreign_nationals: number;
    expired_permits: number;
    overstay_cases: number;
    total_organizations: number;
    active_organizations: number;
    critical_alerts: number;
    high_alerts: number;
}

interface ExpiringPermit {
    id: number;
    full_name: string;
    passport_number: string;
    permit_expiry_date: string;
    country_of_origin: string;
    permit_type: string;
}

interface RecentAlert {
    id: number;
    title: string;
    message: string;
    severity: string;
    alert_type: string;
    created_at: string;
    alertable: {
        id: number;
        [key: string]: unknown;
    };
}

interface CountryData {
    country_of_origin: string;
    total: number;
}

interface PermitTypeData {
    permit_type: string;
    total: number;
}

interface StatusData {
    status: string;
    total: number;
}

interface MonthlyTrend {
    month: string;
    registrations: number;
}

interface Props {
    stats: Stats;
    expiringPermits: ExpiringPermit[];
    recentAlerts: RecentAlert[];
    countryData: CountryData[];
    permitTypeData: PermitTypeData[];
    statusData: StatusData[];
    monthlyTrends: MonthlyTrend[];
    [key: string]: unknown;
}

export default function WnaDashboard({
    stats,
    expiringPermits,
    recentAlerts,
    countryData,
    permitTypeData,
    statusData,
}: Props) {
    const getSeverityBadge = (severity: string) => {
        const variants = {
            critical: 'destructive',
            high: 'secondary',
            medium: 'outline',
            low: 'default',
        };
        return variants[severity as keyof typeof variants] || 'default';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🛂 WNA Monitoring Dashboard</h1>
                        <p className="text-muted-foreground">
                            Monitor and manage Foreign Nationals and Organizations
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/foreign-nationals/create">
                            <Button>➕ Register WNA</Button>
                        </Link>
                        <Link href="/foreign-organizations/create">
                            <Button variant="outline">🏢 Register Org</Button>
                        </Link>
                    </div>
                </div>

                {/* Critical Alerts */}
                {(stats.critical_alerts > 0 || stats.high_alerts > 0) && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertTitle>⚠️ Alert Notifications</AlertTitle>
                        <AlertDescription>
                            {stats.critical_alerts > 0 && (
                                <span className="text-red-600 font-medium">
                                    {stats.critical_alerts} critical alerts
                                </span>
                            )}
                            {stats.critical_alerts > 0 && stats.high_alerts > 0 && ', '}
                            {stats.high_alerts > 0 && (
                                <span className="text-orange-600 font-medium">
                                    {stats.high_alerts} high priority alerts
                                </span>
                            )}
                            {' require immediate attention.'}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Key Statistics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">👥 Foreign Nationals</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">📊</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_foreign_nationals}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_foreign_nationals} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">🏢 Organizations</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">🏛️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_organizations}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_organizations} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">⏰ Expired Permits</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">⚠️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.expired_permits}</div>
                            <p className="text-xs text-muted-foreground">
                                Permits expired
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">🚨 Overstay Cases</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">❗</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.overstay_cases}</div>
                            <p className="text-xs text-muted-foreground">
                                Requires action
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Expiring Permits */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>⏳ Permits Expiring Soon</CardTitle>
                            <CardDescription>
                                Permits expiring within the next 30 days
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {expiringPermits.length > 0 ? (
                                <div className="space-y-4">
                                    {expiringPermits.map((permit) => (
                                        <div
                                            key={permit.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium">{permit.full_name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {permit.passport_number} • {permit.country_of_origin}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-orange-600">
                                                    {formatDate(permit.permit_expiry_date)}
                                                </div>
                                                <Badge variant="outline">
                                                    {permit.permit_type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <Link href="/foreign-nationals?status=active">
                                            <Button variant="outline" className="w-full">
                                                View All Foreign Nationals
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground">
                                    No permits expiring soon
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Alerts */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>🔔 Recent Alerts</CardTitle>
                            <CardDescription>
                                Latest system notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentAlerts.length > 0 ? (
                                <div className="space-y-4">
                                    {recentAlerts.slice(0, 5).map((alert) => (
                                        <div
                                            key={alert.id}
                                            className="flex items-start gap-3 p-3 border rounded-lg"
                                        >
                                            <Badge variant={getSeverityBadge(alert.severity)}>
                                                {alert.severity}
                                            </Badge>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm">{alert.title}</div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {alert.message}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {formatDate(alert.created_at)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <Button variant="outline" className="w-full" size="sm">
                                            View All Alerts
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground">
                                    No recent alerts
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Data Distribution Charts */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Top Countries */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🌍 Top Countries</CardTitle>
                            <CardDescription>Foreign nationals by country</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {countryData.slice(0, 8).map((country, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{country.country_of_origin}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{
                                                        width: `${(country.total / (countryData[0]?.total || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{country.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Permit Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📄 Permit Types</CardTitle>
                            <CardDescription>Distribution by permit type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {permitTypeData.map((permit, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm capitalize">{permit.permit_type}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${(permit.total / (permitTypeData[0]?.total || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium">{permit.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Status Overview</CardTitle>
                            <CardDescription>Current status distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {statusData.map((status, index) => {
                                    const colors = {
                                        active: 'bg-green-500',
                                        expired: 'bg-orange-500',
                                        overstay: 'bg-red-500',
                                        cancelled: 'bg-gray-500'
                                    };
                                    
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm capitalize">{status.status}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-muted rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${colors[status.status as keyof typeof colors] || 'bg-gray-500'}`}
                                                        style={{
                                                            width: `${(status.total / stats.total_foreign_nationals) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">{status.total}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Quick Actions</CardTitle>
                        <CardDescription>Common management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Link href="/foreign-nationals">
                                <Button variant="outline" className="w-full h-auto p-4">
                                    <div className="text-center">
                                        <div className="text-lg mb-1">👥</div>
                                        <div>Manage WNA</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Link href="/foreign-organizations">
                                <Button variant="outline" className="w-full h-auto p-4">
                                    <div className="text-center">
                                        <div className="text-lg mb-1">🏢</div>
                                        <div>Manage Organizations</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Button variant="outline" className="w-full h-auto p-4">
                                <div className="text-center">
                                    <div className="text-lg mb-1">📊</div>
                                    <div>Generate Reports</div>
                                </div>
                            </Button>
                            
                            <Button variant="outline" className="w-full h-auto p-4">
                                <div className="text-center">
                                    <div className="text-lg mb-1">⚙️</div>
                                    <div>System Settings</div>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}