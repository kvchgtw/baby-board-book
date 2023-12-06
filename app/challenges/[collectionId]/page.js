'use client';
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation'; // Corrected import statement for useRouter
import db from '../../components/database/database';
import styles from '../../components/styles/Collections.module.css';
import { useUser } from "@clerk/clerk-react";
import '../../components/styles/slick_style.css';
import greenCheck from '../../components/styles/images/check_correct.svg'; // Adjust the path as necessary
import redCross from '../../components/styles/images/cross_incorrect.svg'; // Adjust the path as necessary
import Image from 'next/image';


function ChallengePage({ params }) {
  const collectionId = params.collectionId;
  const [images, setImages] = useState([]);
  const [quizImages, setQuizImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quizItem, setQuizItem] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultIcon, setResultIcon] = useState('')
  const [resultMessage, setResultMessage] = useState('');
  const [buttonText, setButtonText] = useState('Check');
  const [buttonColor, setButtonColor] = useState(''); // Additional state for button color
  const [allLoaded, setAllLoaded] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      console.log('userId is not defined');
      return;
    }

    const q = query(
      collection(db, "images"),
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
      if (imagesArray.length >= 4) {
        setupQuiz(imagesArray);
        setAllLoaded(true);
      }
    });

    return () => unsubscribe();
  }, [collectionId, userId]);

  const setupQuiz = (imagesArray) => {
    let selectedItems = [];
    while (selectedItems.length < 4) {
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      const selectedItem = imagesArray[randomIndex];
      if (!selectedItems.some(item => item.itemName === selectedItem.itemName)) {
        selectedItems.push(selectedItem);
      }
    }
    setQuizImages(selectedItems);
    setQuizItem(selectedItems[Math.floor(Math.random() * selectedItems.length)].itemName);
  };

  const selectImage = (itemName) => {
    setSelectedImage(itemName);
  };

  const handleButtonClick = () => {
    if (!showResult) {
      // First click (Confirm Selection)
      confirmSelection();
    } else {
      // Second click (Continue)
      handleContinue();
    }
  };

  const confirmSelection = () => {
    const isCorrect = selectedImage === quizItem;
    if (isCorrect) {
      setCorrectAnswers(prevCount => prevCount + 1);
      setButtonColor('#93D333');
      setResultIcon(greenCheck)
    } else {
      setButtonColor('#EE5555');
      setResultIcon(redCross)

    }
    setButtonText('Next');
    setShowResult(true);
    setResultMessage(isCorrect ? "Correct! You selected the right image." : "Oops! That's not the right image.");
  };

  const handleContinue = () => {
    if (questionCount + 1 < 3) {
      setQuestionCount(prevCount => prevCount + 1);
      setupQuiz(images);
    } else {
      alert(`Round over! You answered ${correctAnswers} out of 3 questions correctly.`);
      router.push('/collections');
    }
    setShowResult(false);
    setSelectedImage('');
    setButtonColor('');
    setResultIcon('');
    setButtonText('Check');
  };

  if (!userId) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      {allLoaded ? (
        <>
          <div className={styles.challenge__TitleText}>Find the image of the {quizItem}</div>
          <div className={styles.challenge__imageContainer}>
            {quizImages.map((image, index) => (
              <div  key={index} onClick={() => selectImage(image.itemName)} 
                   className={selectedImage === image.itemName ? styles.selectedImage : styles.challenge__singleImageContainer}>
                <img className={styles.challenge__Image} src={image.imageUrl} alt={image.itemName || 'Image'} />
              </div>
            ))}
          </div>
          <div className={styles.confirmButton__container}>
            
            
            {showResult && (
              <>
              <div className={styles.challenge__Icon__container}>
                <Image src={resultIcon}  className={styles.resultIcon} />
              </div>
              <div className={styles.resultMessage}>
                <p>{resultMessage}</p>
              </div>
              </>
            )}
            <button onClick={handleButtonClick} 
                    className={styles.confirmButton} 
                    style={{ backgroundColor: buttonColor }}
                    disabled={!selectedImage && !showResult}>
              {buttonText}
            </button>
          </div>
          
        </>
      ) : (
        <>
          <div className={styles.loaderText}>Loading, just a moment...</div>
          <div className={styles.loaderQuote}>"Through shared reading, we gift our children a lens to understand the world, fostering empathy, knowledge, and limitless imagination." - An Anonymous Parent</div>
          <div className={styles.imageLoader}></div>
        </>
      )}
    </>
  );
}

export default ChallengePage;








