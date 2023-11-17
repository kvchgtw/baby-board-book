'use client'
import React, { useState } from 'react'
import styles from '../components/styles/Book.module.css'
import { useUser } from "@clerk/clerk-react";

function Book() {
  const { user } = useUser();
  const [imageUrls, setImageUrls] = useState([]); // 新增狀態來儲存圖片 URL

  const getImageUrldata = async () => {
    try {
      const response = await fetch('/api/getImagesUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          collectionId: '' // 請確保這裡有正確的 collectionId
        }),
      });

      const data = await response.json();
      setImageUrls(data); // 更新狀態以儲存圖片 URL
    } catch (error) {
      console.error('Error downloading image URLs:', error);
    }
  };

  return (
    <>
      <button onClick={getImageUrldata}>Get Image</button>
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} className={styles.image} />
        ))}
      </div>
    </>
  )
}

export default Book
