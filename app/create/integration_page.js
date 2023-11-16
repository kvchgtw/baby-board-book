'use client'
import React, { useState } from 'react';
import styles from '../components/styles/Createpage.module.css';
import Card from '../components/Card';

// ... your arrays for bookCategories and difficultyLevels

const CreatePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);

  const handleCardSelect = (index) => {
      setSelectedCard(index);
      setCategorySelected(true);  // Set category as selected
      selectedCategorySaved = bookCategories[index]
      console.log('selected category: ', selectedCategorySaved.title)
  };

  const handleDifficultySelect = async (level) => {
    try {
        const response = await fetch('/api/fetchData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // 這裡填入你想發送到服務器的數據
            imageHeight: 600,
            imageWidth: 600,
            albedoXLmodelId: '2067ae52-33fd-4a82-bb92-c2c55e7d2786',
            prompt: 'high quality, 8K Ultra HD, style cartoon, two-dimensional, cute baby fox, colorful, high detailed',
            negativePrompt: 'nude, nsfw, text, letters, too many feet, too many fingers, long neck, 2 heads, duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,',
            numImages: 1,
          }),
        });
  
        const data = await response.json();
      //   console.log(data.sdGenerationJob.generationId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  return (
    <>
      <div className={styles.chooseCategoryText}>
        {categorySelected ? "Select Difficulty Level (2/2)" : "Choose a Book Category (1/2)"}
      </div>
      <div className={styles.bookCategoriesContainer}>
        {categorySelected ? (
          difficultyLevels.map((level, index) => (
            <Card
              key={index}
              img={level.img}
              title={level.title}
              subtitle={level.subtitle}
              onSelect={() => handleDifficultySelect(level.title)} // Call API fetch on difficulty select
            />
          ))
        ) : (
          bookCategories.map((bookCategory, index) => (
            <Card
              key={index}
              img={bookCategory.img}
              title={bookCategory.title}
              subtitle={bookCategory.subtitle}
              selected={selectedCard === index}
              onSelect={() => handleCardSelect(index)} 
            />
          ))
        )}
      </div>
    </>
  );
};

export default CreatePage;
