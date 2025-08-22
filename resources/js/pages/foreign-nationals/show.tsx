import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface ForeignNational {
    id: number;
    full_name: string;
    passport_number: string;
    country_of_origin: string;
    nationality: string;
    date_of_birth: string;
    gender: string;
    permit_number: string;
    permit_type: string;
    permit_issue_date: string;
    permit_expiry_date: string;
    activity_type: string;
    current_address: string;
    phone?: string;
    email?: string;
    employer_organization?: string;
    status: string;
    notes?: string;
}

interface Props {
    foreignNational: ForeignNational;
    [key: string]: unknown;
}

export default function ShowForeignNational({ foreignNational }: Props) {
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
                        <h1 className="text-3xl font-bold tracking-tight">👤 {foreignNational.full_name}</h1>
                        <p className="text-muted-foreground">
                            Foreign National Details • {foreignNational.passport_number}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/foreign-nationals">
                            <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                ← Back to List
                            </button>
                        </Link>
                        <Link href={`/foreign-nationals/${foreignNational.id}/edit`}>
                            <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                ✏️ Edit
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Status Badge */}
                <div>
                    <Badge variant={getStatusBadge(foreignNational.status)} className="text-base px-4 py-2">
                        Status: {foreignNational.status.toUpperCase()}
                    </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🆔 Personal Information</CardTitle>
                            <CardDescription>Basic personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <div className="text-lg font-semibold">{foreignNational.full_name}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                <div>{formatDate(foreignNational.date_of_birth)}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Gender</label>
                                <div className="capitalize">{foreignNational.gender}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nationality</label>
                                <div>{foreignNational.nationality}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Country of Origin</label>
                                <div>{foreignNational.country_of_origin}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Passport & Travel Document */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🛂 Passport Information</CardTitle>
                            <CardDescription>Travel document details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Passport Number</label>
                                <div className="text-lg font-mono">{foreignNational.passport_number}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Permit Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📄 Permit Information</CardTitle>
                            <CardDescription>Residence/work permit details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Permit Number</label>
                                <div className="text-lg font-mono">{foreignNational.permit_number}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Permit Type</label>
                                <Badge variant="outline" className="ml-0">
                                    {foreignNational.permit_type}
                                </Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Issue Date</label>
                                <div>{formatDate(foreignNational.permit_issue_date)}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                                <div className="text-lg font-semibold text-orange-600">
                                    {formatDate(foreignNational.permit_expiry_date)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>💼 Activity Information</CardTitle>
                            <CardDescription>Purpose of stay and activities</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Activity Type</label>
                                <Badge variant="outline" className="ml-0">
                                    {foreignNational.activity_type}
                                </Badge>
                            </div>
                            {foreignNational.employer_organization && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Employer/Organization</label>
                                    <div>{foreignNational.employer_organization}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📞 Contact Information</CardTitle>
                            <CardDescription>Address and contact details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Current Address</label>
                                <div>{foreignNational.current_address}</div>
                            </div>
                            {foreignNational.phone && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Phone</label>
                                    <div>{foreignNational.phone}</div>
                                </div>
                            )}
                            {foreignNational.email && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <div>{foreignNational.email}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {foreignNational.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>📝 Notes</CardTitle>
                                <CardDescription>Additional information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="whitespace-pre-wrap">{foreignNational.notes}</div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppShell>
    );
}