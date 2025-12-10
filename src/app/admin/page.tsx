'use client';

import { useEffect, useState } from 'react';
import { BriefcaseIcon, UsersIcon, EnvelopeIcon, NewspaperIcon } from '@heroicons/react/24/outline';

interface Stats {
    projects: number;
    clients: number;
    contacts: number;
    subscribers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ projects: 0, clients: 0, contacts: 0, subscribers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setStats(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const statCards = [
        { name: 'Total Projects', value: stats.projects, icon: BriefcaseIcon, color: 'bg-blue-500' },
        { name: 'Clients', value: stats.clients, icon: UsersIcon, color: 'bg-green-500' },
        { name: 'Contact Messages', value: stats.contacts, icon: EnvelopeIcon, color: 'bg-yellow-500' },
        { name: 'Newsletter Subs', value: stats.subscribers, icon: NewspaperIcon, color: 'bg-purple-500' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                        <dd className="text-lg font-semibold text-gray-900">{card.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <p className="text-gray-600">Select a category from the sidebar to manage your content.</p>
            </div>
        </div>
    );
}
