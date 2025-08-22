import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function CreateForeignOrganization() {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏢 Register Foreign Organization</h1>
                        <p className="text-muted-foreground">
                            Register a new foreign organization in the system
                        </p>
                    </div>
                    <Link href="/foreign-organizations">
                        <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            ← Back to List
                        </button>
                    </Link>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Organization Registration Form</CardTitle>
                        <CardDescription>
                            Fill in the organization's information and registration details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🚧</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Form Under Development</h3>
                            <p className="text-muted-foreground mb-4">
                                The organization registration form is being built. This would include fields for:
                            </p>
                            <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
                                <div>🏢 Organization Details (Name, Type)</div>
                                <div>📋 Registration Information</div>
                                <div>⚖️ Legal Status & Licensing</div>
                                <div>🏠 Business Address</div>
                                <div>📞 Contact Information</div>
                                <div>💼 Activity Description</div>
                                <div>📎 Supporting Documents</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}