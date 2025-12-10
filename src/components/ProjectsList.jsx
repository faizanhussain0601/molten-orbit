'use client';

import { useEffect, useState } from 'react';

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="py-12 bg-gray-50 text-center">Loading projects...</div>;
    }

    return (
        <div id="projects" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Projects</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="h-48 w-full bg-gray-200">
                                <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
                                <p className="mt-2 text-sm text-gray-500 line-clamp-3">{project.description}</p>
                                <div className="mt-4">
                                    <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
                                        Read More &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">No projects found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
