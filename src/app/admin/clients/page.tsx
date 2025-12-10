'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Client {
    _id: string;
    name: string;
    designation: string;
    imageUrl: string;
}

export default function AdminClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            if (data.success) {
                setClients(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this client?')) return;
        try {
            const res = await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Client deleted');
                fetchClients();
            } else {
                toast.error('Failed to delete');
            }
        } catch (error) {
            toast.error('Error deleting client');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Clients</h1>
                <Link
                    href="/admin/clients/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add New Client
                </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {clients.map((client) => (
                        <li key={client._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full object-cover mr-4" src={client.imageUrl} alt="" />
                                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                <div className="ml-2 text-sm text-gray-500">({client.designation})</div>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/admin/clients/edit/${client._id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(client._id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                    {clients.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No clients found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
