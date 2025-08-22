import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function CreateForeignNational() {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">➕ Register Foreign National</h1>
                        <p className="text-muted-foreground">
                            Register a new foreign national in the system
                        </p>
                    </div>
                    <Link href="/foreign-nationals">
                        <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            ← Back to List
                        </button>
                    </Link>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Registration Form</CardTitle>
                        <CardDescription>
                            Fill in the foreign national's information and permit details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🚧</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Form Under Development</h3>
                            <p className="text-muted-foreground mb-4">
                                The registration form is being built. This would include fields for:
                            </p>
                            <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
                                <div>📝 Personal Information (Name, DOB, Gender)</div>
                                <div>🛂 Passport & Nationality Details</div>
                                <div>📄 Permit Information (Type, Dates, Number)</div>
                                <div>🏠 Address & Contact Information</div>
                                <div>💼 Employment/Activity Details</div>
                                <div>📎 Supporting Documents Upload</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}