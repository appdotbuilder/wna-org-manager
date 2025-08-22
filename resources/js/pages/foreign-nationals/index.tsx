import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface ForeignNational {
    id: number;
    full_name: string;
    passport_number: string;
    country_of_origin: string;
    permit_type: string;
    permit_expiry_date: string;
    status: string;
    activity_type: string;
}

interface PaginatedForeignNationals {
    data: ForeignNational[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Props {
    foreignNationals: PaginatedForeignNationals;
    filters: {
        search?: string;
        country?: string;
        status?: string;
        permit_type?: string;
        activity_type?: string;
    };
    filterOptions: {
        countries: string[];
        permitTypes: string[];
        activityTypes: string[];
        statuses: string[];
    };
    [key: string]: unknown;
}

export default function ForeignNationalsIndex({
    foreignNationals,
}: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            active: 'default',
            expired: 'secondary',
            overstay: 'destructive',
            cancelled: 'outline',
        };
        return variants[status as keyof typeof variants] || 'outline';
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
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">👥 Foreign Nationals</h1>
                        <p className="text-muted-foreground">
                            Manage foreign national registrations and permits
                        </p>
                    </div>
                    <Link href="/foreign-nationals/create">
                        <Button>➕ Register New WNA</Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{foreignNationals.meta.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {foreignNationals.data.filter(fn => fn.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Expired</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">⏰</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {foreignNationals.data.filter(fn => fn.status === 'expired').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overstay</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">🚨</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {foreignNationals.data.filter(fn => fn.status === 'overstay').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Foreign Nationals List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Foreign Nationals Registry</CardTitle>
                        <CardDescription>
                            Complete list of registered foreign nationals
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {foreignNationals.data.length > 0 ? (
                            <div className="space-y-4">
                                {foreignNationals.data.map((fn) => (
                                    <div
                                        key={fn.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-medium text-lg">{fn.full_name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {fn.passport_number} • {fn.country_of_origin}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {fn.activity_type} • Expires: {formatDate(fn.permit_expiry_date)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline">
                                                {fn.permit_type}
                                            </Badge>
                                            <Badge variant={getStatusBadge(fn.status)}>
                                                {fn.status}
                                            </Badge>
                                            <Link href={`/foreign-nationals/${fn.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {/* Simple pagination */}
                                <div className="flex justify-between items-center pt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {foreignNationals.data.length} of {foreignNationals.meta.total} entries
                                    </div>
                                    <div className="flex gap-2">
                                        {foreignNationals.links.prev && (
                                            <Link href={foreignNationals.links.prev}>
                                                <Button variant="outline" size="sm">
                                                    Previous
                                                </Button>
                                            </Link>
                                        )}
                                        {foreignNationals.links.next && (
                                            <Link href={foreignNationals.links.next}>
                                                <Button variant="outline" size="sm">
                                                    Next
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👤</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Foreign Nationals Found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by registering your first foreign national.
                                </p>
                                <Link href="/foreign-nationals/create">
                                    <Button>Register New WNA</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}