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
import Modal_Quiz_Finish from '../../components/Modal_Finish_Quiz'


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
  const [confirmButtonColorStyles, setConfirmButtonColorStyles] = useState('')
  const [containerStyle, setcontainerStyle] = useState(styles.confirmButton__container)
  const [challengeHrStyle, setchallengeHrStyle] = useState(styles.challenge__hr)
  const [resultIconClass, setResultIconClass] = useState('');
  const [allLoaded, setAllLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  const { user } = useUser();
  const userId = user?.id;
  
  const playWinSound = () => {
    const audio = new Audio('https://d35aaqx5ub95lt.cloudfront.net/sounds/37d8f0b39dcfe63872192c89653a93f6.mp3');
    audio.play();
  }

  const playLostSound = () => {
    const audio = new Audio('https://d35aaqx5ub95lt.cloudfront.net/sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3');
    audio.play();
  }

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
      setConfirmButtonColorStyles(styles.challenge__green__confirmButton)
      setResultIcon(greenCheck)
      setResultIconClass(styles.greenCheckIcon);
      playWinSound();
    } else {
      setConfirmButtonColorStyles(styles.challenge__red__confirmButton)
      setResultIcon(redCross)
      setResultIconClass(styles.redCrossIcon);
      playLostSound();
    }
    setchallengeHrStyle(styles.challenge__hr__hide)
    setcontainerStyle(styles.confirmButton__container__clicked)
    setButtonText('Next');
    setShowResult(true);
    setResultMessage(isCorrect ? "Correct! You selected the right image." : "Oops! That's not the right image.");
  };

  const handleContinue = () => {
    if (questionCount + 1 < 3) {
      setQuestionCount(prevCount => prevCount + 1);
      setupQuiz(images);
    } else {
      // alert(`Round over! You answered ${correctAnswers} out of 3 questions correctly.`);
      setShowModal(true);
      // router.push('/collections');
    }
    setShowResult(false);
    setSelectedImage('');
    setResultIcon('');
    setResultIconClass('');
    setButtonText('Check');
    setcontainerStyle(styles.confirmButton__container)
    setchallengeHrStyle(styles.challenge__hr)
    setConfirmButtonColorStyles('')


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
          <Modal_Quiz_Finish show={showModal} >
            <h2>Good job!</h2>
            <div className={styles.modalText}>You answered {correctAnswers} out of 3 questions correctly.</div>
          </Modal_Quiz_Finish>
          <div className={`${styles.challenge__hr} ${challengeHrStyle}`}></div>
          <div className={`${styles.confirmButton__container} ${containerStyle}`}>
           
            {showResult && (
              <>
                <div className={styles.challenge__result__container}>
                  <div className={styles.challenge__Icon__container}>
                    <Image priority src={resultIcon}  className={`${styles.resultIcon} ${resultIconClass}`} />
                  </div>
                  <div className={styles.resultMessage}>
                    {resultMessage}
                  </div>
                </div>
              </>
            )}
            <button onClick={handleButtonClick} 
                    className={`${styles.confirmButton} ${confirmButtonColorStyles}` }
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