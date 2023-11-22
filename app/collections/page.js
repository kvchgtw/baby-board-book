'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/clerk-react";
import Card from '../components/Card';

const CollectionsPage = () => {
    const { user } = useUser();
    const router = useRouter();

    const [collections, setCollections] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('/api/getCollections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCollections(data);
            })
            .catch(error => console.error('Error fetching collections:', error));
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Collections</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {collections.map((collection) => (
                    <div 
                        key={collection.collectionId} 
                        style={{ margin: '10px', cursor: 'pointer' }}
                        onClick={() => router.push(`/collections/${collection.collectionId}`)}
                    >
                        <img 
                            src={collection.collectionCoverPhoto} 
                            alt={collection.collectionName} 
                            style={{ width: '200px', height: '200px' }} 
                        />
                        <h3>{collection.collectionName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;
