'use client'
import React from 'react';
import styles from './styles/Modal_Quiz_Finish.module.css'; // Import your CSS module here
import { useRouter } from 'next/navigation';
import greenCheck from './styles/images/check_correct.svg'; // Adjust the path as necessary
import Image from 'next/image'


const Modal = ({ show, onClose, children }) => {
  const router = useRouter();

  if (!show) return null;

  const handleClose = () => {
    if (onClose) onClose();
    router.push('/collections'); // Redirect when the modal is closed
  };

  return (
    <div className={styles.modalBackdrop} >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <div className={styles.modal_graphic}>
        <Image priority src={greenCheck}  className={styles.greenCheckIcon} />
      </div>

        {children}
        <button onClick={handleClose} className={styles.closeButton}>Back to Collections</button>
      </div>
    </div>
  );
};

export default Modal;
