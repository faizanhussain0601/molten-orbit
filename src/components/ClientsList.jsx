'use client';

import { useEffect, useState } from 'react';

export default function ClientsList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/clients')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setClients(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-12 bg-white text-center">Loading clients...</div>;
    }

    return (
        <div id="clients" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Happy Clients</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client) => (
                        <div key={client._id} className="bg-gray-50 rounded-lg p-8 text-center hover:bg-gray-100 transition-colors duration-300">
                            <img className="mx-auto h-24 w-24 rounded-full object-cover" src={client.imageUrl} alt={client.name} />
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                                <p className="text-sm text-indigo-500">{client.designation}</p>
                            </div>
                            <p className="mt-4 text-gray-500 italic">"{client.description}"</p>
                        </div>
                    ))}
                    {clients.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No clients found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
