'use client';
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from '../../components/database/database'; // 确保正确导入了 Firestore 数据库实例
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../components/styles/Collections.module.css'; // Assuming you have a CSS module for styling


function CollectionIdPage({ params }) {
  const collectionId = params.collectionId;
  const [images, setImages] = useState([]); // 更新状态以存储图片对象
  const [isLoading, setIsLoading] = useState(true); // 新增加载状态标志

  useEffect(() => {
    // 创建查询：检查 imageUrl 不为空，并且 collectionId 匹配
    const q = query(
      collection(db, "images"),
      where("imageUrl", "!=", ""),
      where("collectionId", "==", collectionId)
    );

    // 设置 Firestore 实时监听器
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imagesArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        imagesArray.push({ imageUrl: data.imageUrl, itemName: data.itemName }); // 获取 imageUrl 和 itemName
      });
      setImages(imagesArray); // 更新状态
      setIsLoading(false); // 数据加载完毕，设置加载状态为 false
    });

    // 清理函数：组件卸载时取消监听
    return () => unsubscribe();
  }, [collectionId]);

  // 加载时显示的内容
  if (isLoading) {
    return <div>Loading images...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={styles.imageContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img className={styles.collectionImage} src={image.imageUrl} alt={image.itemName || 'Image'} />
              {/* <div className={styles.textShadow}></div> */}
              <div className={styles.itemNameText}>{image.itemName}</div> {/* 显示图片名称 */}
          
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CollectionIdPage;
