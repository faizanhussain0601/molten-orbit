'use client';

import ProjectForm from "@/components/admin/ProjectForm";
import { useEffect, useState } from "react";

export default function EditProjectPage({ params }) {
    const id = params.id;
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/projects`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const found = data.data.find((p) => p._id === id);
                    setProject(found);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
            <ProjectForm initialData={project} />
        </div>
    );
}
