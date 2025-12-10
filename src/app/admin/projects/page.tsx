'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Project {
    _id: string;
    title: string;
    imageUrl: string;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Project deleted');
                fetchProjects();
            } else {
                toast.error('Failed to delete');
            }
        } catch (error) {
            toast.error('Error deleting project');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add New Project
                </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {projects.map((project) => (
                        <li key={project._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full object-cover mr-4" src={project.imageUrl} alt="" />
                                <div className="text-sm font-medium text-indigo-600 truncate">{project.title}</div>
                            </div>
                            <div className="flex space-x-2">
                                <Link
                                    href={`/admin/projects/edit/${project._id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                    {projects.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No projects found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
