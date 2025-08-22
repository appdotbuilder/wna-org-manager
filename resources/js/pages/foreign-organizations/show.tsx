import React from 'react';
import { AppShell } from '@/components/app-shell';
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
    registration_date: string;
    license_expiry_date?: string;
    business_address: string;
    contact_person: string;
    contact_phone: string;
    contact_email: string;
    activity_type: string;
    activity_description: string;
    status: string;
    notes?: string;
}

interface Props {
    organization: ForeignOrganization;
    [key: string]: unknown;
}

export default function ShowForeignOrganization({ organization }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            active: 'default',
            inactive: 'secondary',
            suspended: 'destructive',
            closed: 'outline',
        };
        return variants[status as keyof typeof variants] || 'outline';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏢 {organization.organization_name}</h1>
                        <p className="text-muted-foreground">
                            Organization Details • {organization.registration_number}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/foreign-organizations">
                            <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                ← Back to List
                            </button>
                        </Link>
                        <Link href={`/foreign-organizations/${organization.id}/edit`}>
                            <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                ✏️ Edit
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex gap-2">
                    <Badge variant={getStatusBadge(organization.status)} className="text-base px-4 py-2">
                        Status: {organization.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-base px-4 py-2">
                        {organization.organization_type}
                    </Badge>
                    <Badge variant="outline" className="text-base px-4 py-2">
                        {organization.legal_status}
                    </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Organization Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🏢 Organization Information</CardTitle>
                            <CardDescription>Basic organization details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Organization Name</label>
                                <div className="text-lg font-semibold">{organization.organization_name}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Registration Number</label>
                                <div className="text-lg font-mono">{organization.registration_number}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Country of Origin</label>
                                <div>{organization.country_of_origin}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Organization Type</label>
                                <Badge variant="outline" className="ml-0">
                                    {organization.organization_type}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Legal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚖️ Legal Information</CardTitle>
                            <CardDescription>Legal status and registration details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Legal Status</label>
                                <Badge variant="outline" className="ml-0">
                                    {organization.legal_status}
                                </Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Registration Date</label>
                                <div>{formatDate(organization.registration_date)}</div>
                            </div>
                            {organization.license_expiry_date && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600">License Expiry Date</label>
                                    <div className="text-lg font-semibold text-orange-600">
                                        {formatDate(organization.license_expiry_date)}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📞 Contact Information</CardTitle>
                            <CardDescription>Primary contact and address details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Contact Person</label>
                                <div className="text-lg font-semibold">{organization.contact_person}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Phone</label>
                                <div>{organization.contact_phone}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <div>{organization.contact_email}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Business Address</label>
                                <div>{organization.business_address}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>💼 Activity Information</CardTitle>
                            <CardDescription>Business activities and purpose</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Activity Type</label>
                                <Badge variant="outline" className="ml-0">
                                    {organization.activity_type}
                                </Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Activity Description</label>
                                <div className="whitespace-pre-wrap">{organization.activity_description}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {organization.notes && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>📝 Notes</CardTitle>
                                <CardDescription>Additional information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="whitespace-pre-wrap">{organization.notes}</div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppShell>
    );
}