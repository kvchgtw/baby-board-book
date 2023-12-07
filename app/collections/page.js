'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/clerk-react";
import styles from '../components/styles/Collections.module.css'; // Assuming you have a CSS module for styling
import Link from 'next/link'
import Footer from '../components/Footer'


const CollectionsPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [collections, setCollections] = useState([]);
    const [isNotEmpty, setNotEmpty] = useState(true)

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
                console.log(data.message)
                if (data.message == 'No images found.'){
                    setNotEmpty(false)
                }else{
                setCollections(data);
                setNotEmpty(true)

                }
            })
            .catch(error => console.error('Error fetching collections:', error));
        }
    }, [user]);

    

    return (
        <>
                {isNotEmpty ? (
                        <div>
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
                    ) : (
                        <><div className={styles.emptyDataError}>You have no collection now. Press the Create button to try out.</div>
                            <div className={styles.buttonContainer}>
                                <Link href= '/create'>
                                    <button className={styles.createCTAbtn}> Create Now </button>
                                </Link>
                            </div>
                        </>
                    )
                }
            <Footer />
        </>
    );
};

export default CollectionsPage;
