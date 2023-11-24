'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/clerk-react";
import styles from '../components/styles/Collections.module.css'; // Assuming you have a CSS module for styling

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
            <div className={styles.collectionTitle}>Collections</div>
            <div className={styles.collectionCardContainer} >
                {collections.map((collection) => (
                    <div 
                        key={collection.collectionId} 
                        style={{ margin: '10px', cursor: 'pointer' }}
                        onClick={() => router.push(`/collections/${collection.collectionId}`)}
                    >
                        <img className={styles.collectionThumbnail}
                            src={collection.collectionCoverPhoto} 
                            alt={collection.collectionName} 
                        />
                        <div className={styles.collectionNmae}>{collection.collectionName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;
