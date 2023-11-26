'use client';
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from '../../components/database/database';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../components/styles/Collections.module.css';
import { useUser } from "@clerk/clerk-react";
import '../../components/styles/slick_style.css'



function CollectionIdPage({ params }) {
  const collectionId = params.collectionId;
  const [images, setImages] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const { user } = useUser();
  const userId = user?.id; // Use optional chaining

  useEffect(() => {
    // Ensure userId is defined before proceeding
    if (!userId) {
      console.log('userId is not defined');
      return;
    }

    const q = query(
      collection(db, "images"),
      where("imageUrl", "!=", ""),
      where("collectionId", "==", collectionId),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imagesArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        imagesArray.push({ imageUrl: data.imageUrl, itemName: data.itemName });
      });
      setImages(imagesArray);
      console.log('update query image array: ', imagesArray);
      loader(imagesArray);
    });

    return () => unsubscribe();
  }, [collectionId, userId]);

  function loader(imagesArray) {
    if (imagesArray.length !== 0) {
      setAllLoaded(true);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  // Conditional rendering based on the availability of userId
  if (!userId) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      {allLoaded ? (
        <div className={styles.imageContainer}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img className={styles.collectionImage} src={image.imageUrl} alt={image.itemName || 'Image'} />
                <div className={styles.itemNameText}>{image.itemName}</div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className={styles.loaderText}>Loading images. Please wait for the images generation...</div>
      )}
    </>
  );
}

export default CollectionIdPage;
