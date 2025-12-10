'use client';

import ClientForm from "@/components/admin/ClientForm";
import { useEffect, useState } from "react";

export default function EditClientPage({ params }: { params: { id: string } }) {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/clients`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((c: any) => c._id === params.id);
                    setClient(found);
                }
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!client) return <div>Client not found</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Client</h1>
            <ClientForm initialData={client} />
        </div>
    );
}
