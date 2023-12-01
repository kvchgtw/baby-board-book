import React from 'react';
import Image from 'next/image';
import styles from './styles/Card.module.css'; // Assuming you have a CSS module for styling

const Card = ({ img, title, subtitle, selected, onSelect }) => {
    const cardStyles = `${styles.card} ${selected ? styles.selected : ''}`;

    return (
        <div className={cardStyles} onClick={onSelect}>
            {img && <div className={styles.cardImage}>
                <Image src={img} alt={title} width={220} height={220} style={{objectFit:"cover"}}  className={styles.cardImage}/>
            </div>}
            <div className={styles.cardContent}>
                {title && <h2 className={styles.cardTitle}>{title}</h2>}
                {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
            </div>
        </div>
    );
};

export default Card;
