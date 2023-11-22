'use client'
import React, { useState } from 'react'
import styles from '../components/styles/Book.module.css'
import { useUser } from "@clerk/clerk-react";

function Book() {
  const { user } = useUser();
  const [imagesData, setImagesData] = useState([]); // 更新状态以存储图片数据（包括 URL 和名称）

  const getImagesData = async () => {
    try {
      const response = await fetch('/api/getImagesUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          collectionId: '' // 确保这里有正确的 collectionId
        }),
      });

      const data = await response.json();
      console.log(data);
      setImagesData(data); // 更新状态以存储从 API 获取到的图片数据
    } catch (error) {
      console.error('Error downloading images data:', error);
    }
  };

  return (
    <>
      <button onClick={getImagesData}>Get Image</button>
      <div>
        {imagesData.map((image, index) => (
          <div key={index}>
            <img src={image.imageUrl} alt={image.itemName} className={styles.image} />
            <p>{image.itemName}</p> {/* 显示图片名称 */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Book
