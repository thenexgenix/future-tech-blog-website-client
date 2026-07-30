import React from 'react';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';
import { getResourcesById } from '@/lib/api/resources';

export default async function ResourceDetailPage({ params }) {
    const { id } = await params;

    let resource = null;

    try {
        const res = await getResourcesById(id);
        resource = res?.data || res;
    } catch (error) {
        console.error('Failed to fetch resource:', error);
    }

    if (!resource) {
        notFound();
    }

    return (
        <div className="min-h-screen text-white p-6 sm:p-8 max-w-7xl mx-auto">
            <EditForm resource={resource} id={id} />
        </div>
    );
}