import React from 'react';
import { getAllPodcasts } from '@/lib/api/podcasts';
import PodcastView from './PodcastView';


export const revalidate = 0; // Fresh/Dynamic data ensure করার জন্য

export default async function PodcastPage() {
    let initialPodcasts = [];

    try {
        const response = await getAllPodcasts();
        initialPodcasts = response?.data || (Array.isArray(response) ? response : []);
    } catch (error) {
        console.error('Error fetching podcasts on server:', error);
    }

    return <PodcastView initialPodcasts={initialPodcasts} />;
}