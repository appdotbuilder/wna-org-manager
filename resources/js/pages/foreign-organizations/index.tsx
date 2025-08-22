import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface ForeignOrganization {
    id: number;
    organization_name: string;
    registration_number: string;
    country_of_origin: string;
    organization_type: string;
    legal_status: string;
    status: string;
    contact_person: string;
    activity_type: string;
}

interface PaginatedOrganizations {
    data: ForeignOrganization[];
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
    organizations: PaginatedOrganizations;
    filters: {
        search?: string;
        country?: string;
        status?: string;
        organization_type?: string;
        activity_type?: string;
    };
    filterOptions: {
        countries: string[];
        organizationTypes: string[];
        activityTypes: string[];
        statuses: string[];
    };
    [key: string]: unknown;
}

export default function ForeignOrganizationsIndex({
    organizations,
}: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            active: 'default',
            inactive: 'secondary',
            suspended: 'destructive',
            closed: 'outline',
        };
        return variants[status as keyof typeof variants] || 'outline';
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏢 Foreign Organizations</h1>
                        <p className="text-muted-foreground">
                            Manage foreign organization registrations and licenses
                        </p>
                    </div>
                    <Link href="/foreign-organizations/create">
                        <Button>🏢 Register New Organization</Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">🏢</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{organizations.meta.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {organizations.data.filter(org => org.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">⚠️</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {organizations.data.filter(org => org.status === 'suspended').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Closed</CardTitle>
                            <div className="h-4 w-4 text-muted-foreground">🔒</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {organizations.data.filter(org => org.status === 'closed').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Organizations List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Foreign Organizations Registry</CardTitle>
                        <CardDescription>
                            Complete list of registered foreign organizations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {organizations.data.length > 0 ? (
                            <div className="space-y-4">
                                {organizations.data.map((org) => (
                                    <div
                                        key={org.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-medium text-lg">{org.organization_name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {org.registration_number} • {org.country_of_origin}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Contact: {org.contact_person} • {org.activity_type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline">
                                                {org.organization_type}
                                            </Badge>
                                            <Badge variant="outline">
                                                {org.legal_status}
                                            </Badge>
                                            <Badge variant={getStatusBadge(org.status)}>
                                                {org.status}
                                            </Badge>
                                            <Link href={`/foreign-organizations/${org.id}`}>
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
                                        Showing {organizations.data.length} of {organizations.meta.total} entries
                                    </div>
                                    <div className="flex gap-2">
                                        {organizations.links.prev && (
                                            <Link href={organizations.links.prev}>
                                                <Button variant="outline" size="sm">
                                                    Previous
                                                </Button>
                                            </Link>
                                        )}
                                        {organizations.links.next && (
                                            <Link href={organizations.links.next}>
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
                                <div className="text-6xl mb-4">🏢</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Organizations Found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by registering your first foreign organization.
                                </p>
                                <Link href="/foreign-organizations/create">
                                    <Button>Register New Organization</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}