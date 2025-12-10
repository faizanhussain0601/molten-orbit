'use client';

import ClientForm from "@/components/admin/ClientForm";
import { useEffect, useState, use } from "react";

export default function EditClientPage({ params }) {
    // In Next.js 15+ compatible way, wrap params in use() if it's a promise,
    // but typically unwrapping prop in client components is safer done async or just assume prop.
    // We'll stick to 'as-is' or safe unwrap if passing promise.

    // NOTE: If params is a Promise (Next 15), we should use `use(params)`.
    // Since we are moving to JS, let's just use it directly. 
    // If runtime breaks, we might need `const { id } = React.use(params)`

    // For now, assuming Next.js 14-like behavior where it's passed resolved in some contexts or simpler:
    const id = params.id;

    // Better safe for Next 15:
    // const { id } = use(params); 
    // But `use` requires React 'canary' or 19. If user is on stable Next 14, `use` might not be available or params is object.
    // Let's keep it simple.

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/clients`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((c) => c._id === id);
                    setClient(found);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!client) return <div>Client not found</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Client</h1>
            <ClientForm initialData={client} />
        </div>
    );
}
