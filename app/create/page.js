'use client'
import React from 'react'
import styles from '../components/styles/Createpage.module.css'
import { useState } from 'react';
import Card from '../components/Card';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'; // 引入用于生成 UUID 的库



const animalEasyList = ['cat', 'dog']
const animalMediumList = ['otter', 'sloth']
const animalHardList = ['elephant', 'toucan']


const vehicleEasyList = ['truck', 'train']
const vehicleMediumList = ['bicycle', 'motorcycle']
const vehicleHardList = ['police car', 'ambulance']


const fruitEasyList = ['apple', 'banana']
const fruitMediumList = ['orange', 'pineapple']
const fruitHardList = ['avocado', 'durian']


let selectedCategorySaved = {};
let selectedCategoryTitle = '';
const bookCategories = [
    {
        title: "Animals",
        img: "/images/polarBear_250_250.jpg",
        subtitle: "Say hello to cute animals!",
    },
    {
        title: "Vehicles",
        img: "/images/truck250.jpg",
        subtitle: "Big and small, explore all",
    },
    {
        title: "Fruits",
        img: "/images/fruits250.jpg",
        subtitle: "Yummy fruits"
      ,
    },
    
];
const difficultyLevels = [
  {
      title: "Easy",
      img: "/images/leopardCat.jpg",  // Replace with your image paths
      subtitle: "Beginner friendly",
  },
  {
      title: "Medium",
      img: "/images/babyleopard.jpg",
      subtitle: "For the experienced",
  },
  {
      title: "Hard",
      img: "/images/leopard.jpg",
      subtitle: "Challenge yourself",
  },
];

const CreatePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const collectionId = uuidv4()
  const { user } = useUser();

  const getListByCategoryAndDifficulty = (category, difficulty) => {
    const categoryMap = {
        Animals: { Easy: animalEasyList, Medium: animalMediumList, Hard: animalHardList },
        Vehicles: { Easy: vehicleEasyList, Medium: vehicleMediumList, Hard: vehicleHardList },
        Fruits: { Easy: fruitEasyList, Medium: fruitMediumList, Hard: fruitHardList },
    };

    return categoryMap[category][difficulty];
};

const generatePrompt = (category, itemName) => {
  // Customize the prompt based on category
  let description = '';
  switch (category) {
      case 'Animals':
          description = 'one cute baby';
          break;
      case 'Vehicles':
          description = 'cartoon, detailed';
          break;
      case 'Fruits':
          description = 'fresh, vibrant, delicious';
          break;
      default:
          description = 'colorful, high detailed';
          break;
  }
  return `high quality, 8K Ultra HD, style cartoon, two-dimensional, ${description} ${itemName}`;
};

  const handleCardSelect = (index) => {
      setSelectedCard(index);
      setCategorySelected(true);  // Set category as selected
      selectedCategorySaved = bookCategories[index]
      selectedCategoryTitle = selectedCategorySaved.title
      console.log('selected category: ', selectedCategoryTitle)
  };

  const handleDifficultySelect = async (difficultyLevel) => {
    try {
      console.log('handleDifficultySelect 啟動')
        const itemList = getListByCategoryAndDifficulty(selectedCategoryTitle, difficultyLevel);
        console.log('new itemList: ', itemList)
        for (const itemName of itemList) {  // 遍歷 animalList
        const prompt = generatePrompt(selectedCategoryTitle, itemName);
        
        console.log('prompt:', prompt)
      
      const response = await fetch('/api/fetchData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // 這裡填入你想發送到服務器的數據
            imageHeight: 512,
            imageWidth: 512,
            albedoXLmodelId: '2067ae52-33fd-4a82-bb92-c2c55e7d2786',
            prompt: prompt,
            negativePrompt: 'duplicate, multiple animals, repeated animal pattern, nude, nsfw, text, letters, too many feet, too many fingers, long neck, 2 heads, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,',
            numImages: 1,
            itemName: `${itemName}`,
            userId: user.id,
            collectionId: collectionId,
            category: selectedCategoryTitle,
          }),
        });
  
        const data = await response.json();
        // const generationId = await data.sdGenerationJob.generationId
        console.log('fetchData response:', data); 
          
        }
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
            <Link href={`/collections/${collectionId}`}>
            <Card
              key={index}
              img={level.img}
              title={level.title}
              subtitle={level.subtitle}
              onSelect={() => handleDifficultySelect(level.title)} // Call API fetch on difficulty select
              // Add onSelect for difficulty level cards
            />
            </Link>
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
