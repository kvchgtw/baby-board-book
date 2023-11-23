import db from './database/database';
import React, { useEffect, useState } from 'react';

const ImageUrlListener = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('images')
      .where("imageUrl", "!==", "")
      .onSnapshot(snapshot => {
        const updatedImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImages(updatedImages);
      });

    // 清理函數，當組件卸載時取消監聽
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {images.map(image => (
        <div key={image.id}>
          <img src={image.imageUrl} alt="Image" />
          {/* 其他 UI 元素 */}
        </div>
      ))}
    </div>
  );
};

export default ImageUrlListener;
