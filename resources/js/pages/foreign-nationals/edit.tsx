import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface ForeignNational {
    id: number;
    full_name: string;
    [key: string]: unknown;
}

interface Props {
    foreignNational: ForeignNational;
    [key: string]: unknown;
}

export default function EditForeignNational({ foreignNational }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">✏️ Edit {foreignNational.full_name}</h1>
                        <p className="text-muted-foreground">
                            Update foreign national information
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/foreign-nationals/${foreignNational.id}`}>
                            <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                ← Back to Details
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Information</CardTitle>
                        <CardDescription>
                            Update the foreign national's details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🚧</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Form Under Development</h3>
                            <p className="text-muted-foreground mb-4">
                                The edit form is being built. This would include pre-filled fields for updating:
                            </p>
                            <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
                                <div>📝 Personal Information</div>
                                <div>🛂 Passport Details</div>
                                <div>📄 Permit Information</div>
                                <div>🏠 Address & Contact</div>
                                <div>💼 Activity Details</div>
                                <div>📊 Status Updates</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}