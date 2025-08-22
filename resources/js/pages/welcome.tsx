import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="WNA Monitoring System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 shadow-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-center lg:gap-12">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-6">
                                <div className="mb-4 text-6xl">🛂</div>
                                <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                                    WNA Monitoring System
                                </h1>
                                <p className="mb-8 text-xl text-gray-600 lg:text-2xl">
                                    Comprehensive monitoring and management system for Foreign Nationals and Organizations
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mb-8 grid gap-4 text-left md:grid-cols-2">
                                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                                    <div className="text-2xl">👥</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Foreign National Registry</h3>
                                        <p className="text-sm text-gray-600">Track permits, visas, and residency status</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                                    <div className="text-2xl">🏢</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Organization Management</h3>
                                        <p className="text-sm text-gray-600">Monitor foreign companies and entities</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                                    <div className="text-2xl">⚠️</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Early Warning System</h3>
                                        <p className="text-sm text-gray-600">Automated alerts for expiring permits</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                                    <div className="text-2xl">📊</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Analytics & Reports</h3>
                                        <p className="text-sm text-gray-600">Export data in PDF, Excel, and CSV</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/"
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 shadow-lg"
                                        >
                                            🚀 Open Dashboard
                                        </Link>
                                        <Link
                                            href="/foreign-nationals"
                                            className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-8 py-3 text-lg font-semibold text-blue-900 hover:bg-blue-50"
                                        >
                                            👥 Manage WNA
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 shadow-lg"
                                        >
                                            🚀 Get Started
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-8 py-3 text-lg font-semibold text-blue-900 hover:bg-blue-50"
                                        >
                                            🔑 Login
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Visual/Mockup */}
                        <div className="flex-1 mt-8 lg:mt-0">
                            <div className="rounded-xl bg-white p-6 shadow-xl">
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                    <div className="ml-2 text-sm font-medium text-gray-600">WNA Dashboard</div>
                                </div>
                                
                                <div className="space-y-4">
                                    {/* Dashboard Preview */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <div className="text-sm text-blue-600">Total WNA</div>
                                            <div className="text-2xl font-bold text-blue-900">1,247</div>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-4">
                                            <div className="text-sm text-green-600">Active</div>
                                            <div className="text-2xl font-bold text-green-900">1,145</div>
                                        </div>
                                        <div className="rounded-lg bg-orange-50 p-4">
                                            <div className="text-sm text-orange-600">Expiring</div>
                                            <div className="text-2xl font-bold text-orange-900">87</div>
                                        </div>
                                        <div className="rounded-lg bg-red-50 p-4">
                                            <div className="text-sm text-red-600">Overstay</div>
                                            <div className="text-2xl font-bold text-red-900">15</div>
                                        </div>
                                    </div>
                                    
                                    {/* Alert Preview */}
                                    <div className="rounded-lg bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                        <div className="flex">
                                            <div className="text-yellow-400">⚠️</div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-yellow-800">
                                                    5 permits expiring within 30 days
                                                </p>
                                                <p className="text-sm text-yellow-700">
                                                    Immediate attention required
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Table Preview */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                            <span className="text-sm font-medium text-gray-600">Name</span>
                                            <span className="text-sm font-medium text-gray-600">Country</span>
                                            <span className="text-sm font-medium text-gray-600">Status</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-sm text-gray-900">John Smith</span>
                                            <span className="text-sm text-gray-600">🇺🇸 USA</span>
                                            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                                                Active
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-sm text-gray-900">Marie Dupont</span>
                                            <span className="text-sm text-gray-600">🇫🇷 France</span>
                                            <span className="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                                                Expiring
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-600">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                        <span>🛡️ Secure • 📊 Comprehensive • ⚡ Real-time</span>
                        <span>
                            Built with ❤️ by{" "}
                            <a 
                                href="https://app.build" 
                                target="_blank" 
                                className="font-medium text-blue-600 hover:underline"
                            >
                                app.build
                            </a>
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}