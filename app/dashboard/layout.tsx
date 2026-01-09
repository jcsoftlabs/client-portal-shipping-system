'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Home, MapPin, History, FileText, User, LogOut, Menu, X, Bell } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
        } else {
            // Fetch user data for display
            import('@/lib/api').then(({ authApi }) => {
                authApi.getMe()
                    .then(setUser)
                    .catch((error) => {
                        // Only redirect on 401 (unauthorized), not on network errors
                        if (error.response?.status === 401) {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            router.push('/login');
                        }
                    });
            });
        }
    }, [router]);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Mon Adresse USA', href: '/dashboard/my-address', icon: MapPin },
        { name: 'Mes Colis', href: '/dashboard/parcels', icon: Package },
        { name: 'Historique', href: '/dashboard/history', icon: History },
        { name: 'Factures', href: '/dashboard/invoices', icon: FileText },
        { name: 'Profil', href: '/dashboard/profile', icon: User },
    ];

    // Mobile navigation (bottom bar) - only first 5 items
    const mobileNavigation = navigation.slice(0, 5);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="flex items-center">
                                <Image
                                    src="/yeng-logo.png"
                                    alt="Yeng Shipping And Services"
                                    width={180}
                                    height={60}
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* User Menu Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center text-white font-semibold">
                                        {user?.firstName?.[0] || user?.first_name?.[0] || 'U'}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium text-gray-700">
                                        {user?.firstName || user?.first_name || 'Utilisateur'}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {userMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                            <Link
                                                href="/dashboard/profile"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <User className="h-4 w-4" />
                                                Mon Profil
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    handleLogout();
                                                }}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Déconnexion
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex pt-16">
                {/* Desktop Sidebar - Hidden on mobile */}
                <aside
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out pt-16 lg:pt-0 hidden lg:block`}
                >
                    <nav className="h-full overflow-y-auto py-6 px-4">
                        <div className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* Main Content - with bottom padding on mobile for bottom nav */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-inset-bottom">
                <div className="grid grid-cols-5 h-16">
                    {mobileNavigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className={`h-6 w-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                    {item.name === 'Mon Adresse USA' ? 'Adresse' :
                                        item.name === 'Mes Colis' ? 'Colis' :
                                            item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile sidebar overlay - only for hamburger menu */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-10 pt-16"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
