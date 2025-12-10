'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, BriefcaseIcon, UsersIcon, EnvelopeIcon, NewspaperIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    // removed auth check as per user request

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Projects', href: '/admin/projects', icon: BriefcaseIcon },
        { name: 'Clients', href: '/admin/clients', icon: UsersIcon },
        { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon },
        { name: 'Newsletter', href: '/admin/newsletter', icon: NewspaperIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex md:flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-indigo-600">Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-150 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Link
                        href="/"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    >
                        <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm md:hidden">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-indigo-600">Admin</span>
                        {/* Mobile menu button could go here */}
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
