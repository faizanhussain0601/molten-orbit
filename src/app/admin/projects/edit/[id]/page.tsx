'use client';

import ProjectForm from "@/components/admin/ProjectForm";
import { useEffect, useState } from "react";

export default function EditProjectPage({ params }: { params: { id: string } }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects`) // Ideally fetch specific ID but I didn't make getById public API except PUT/DELETE. 
            // Wait, I didn't create a GET by ID route. I should have. 
            // But I can fetch all and filter clientside for now or add GET to [id]/route.ts.
            // Adding GET to [id] would be better practice.
            // But for speed, I will filter from list or add GET to [id].
            // Let's add GET to [id]/route.ts quickly.
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((p: any) => p._id === params.id);
                    setProject(found);
                }
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
            <ProjectForm initialData={project} />
        </div>
    );
}
