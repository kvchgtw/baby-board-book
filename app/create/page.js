'use client'
import React from 'react'
import styles from '../components/styles/Createpage.module.css'
import { useState } from 'react';
import Card from '../components/Card';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'; // 引入用于生成 UUID 的库
import Footer from '../components/Footer'


const animalEasyList = ['cat', 'dog', 'fox', "elephant", 'Raccoon', 'rabbit']

// const animalEasyList = ['cat', 'dog', 'fox', "elephant", "lion", "tiger", "zebra", "giraffe", "bear", 
// "wolf"]

const animalMediumList = ['otter', 'sloth', 'panda', "leopard", "meerkat" 
, "penguin", ]

const animalHardList = [ 'hippopotamus', 'polar bear',"parrot", "buffalo", "donkey", "hamster"]


const vehicleEasyList = ['airplane', 'school bus', "train",  "boat", "garbage truck", "sports car", "ice cream truck", "scooter"]
const vehicleMediumList = ['bicycle', 'motorcycle', 'yacht', "bulldozer", "canoe", "van", "cement mixer", 'rocket']
const vehicleHardList = ['police car', 'ambulance', 'helicopter', 'fire engine', "tractor", "Tesla Model 3", 'dump truck', "snowmobile", 'Aircraft carrier']


const fruitEasyList = ['strawberry', 'banana', 'lemon', "orange", "mango", "grape", "pineapple", "watermelon", "cherry", "peach"]
const fruitMediumList = ["pear", "plum", "grapefruit", "raspberry", "dragon fruit", "passion fruit", "lychee", "papaya", "guava", "cranberry"]
const fruitHardList = ['avocado', 'durian', 'blueberry', 'persimmon', 'kumquat', 'mulberry', "tangerine", 'elderberry']


const sleepAnimalEasyList = ['cat', 'dog', 'fox', "lion", "tiger", "bear", "wolf"]

const sleepAnimalMediumList = ['otter', 'sloth', 'panda', "leopard", "meerkat", "penguin", ]

const sleepAnimalHardList = [ 'Siberian Husky', 'Bulldog',"Shiba inu", "buffalo", "Saint Bernard", ]


let selectedCategoryDisplayedNameSaved = {};
let selectedCategorySaved = {};
let selectedCategoryTitle = '';
const bookCategories = [
    {
        displayedTitle: "Animals",
        title: "Animals",
        img: "/images/polarBear_250_250_small.jpg",
        subtitle: "Say hello to cute animals!",
    },
    {
        displayedTitle: "Vehicles",
        title: "Vehicles",
        img: "/images/truck250_small.jpg",
        subtitle: "Big and small, explore all",
    },
    {
        displayedTitle: "Fruits",      
        title: "Fruits",
        img: "/images/fruits250_small.jpg",
        subtitle: "Yummy fruits"
      ,
    },
    {
      displayedTitle: "Sleeping Animals",      
      title: "SleepingAnimals",
      img: "/images/sleep_cat.jpg",
      subtitle: "Say good night to animals!",
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
        SleepingAnimals: { Easy: sleepAnimalEasyList, Medium: sleepAnimalMediumList, Hard: sleepAnimalHardList },

    };
    if (!categoryMap[category]) {
      console.error(`Category '${category}' not found.`);
      return []; // or handle the error as appropriate
  }

  if (!categoryMap[category][difficulty]) {
      console.error(`Difficulty level '${difficulty}' not found in category '${category}'.`);
      return []; // or handle the error as appropriate
  }

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
          description = 'detailed';
          break;
      case 'Fruits':
          description = 'fresh, vibrant, delicious';
          break;
      case 'SleepingAnimals':
          description = 'night, bed, closed eyes, asleep, one sleeping cute baby';
          break;
      default:
          description = 'colorful, high detailed';
          break;
  }
  // console.log('description: ', description)

  return `high quality, 8K Ultra HD, style cartoon, two-dimensional, ${description} ${itemName}`;
};

  const handleCardSelect = (index) => {
      setSelectedCard(index);
      setCategorySelected(true);  // Set category as selected
      selectedCategorySaved = bookCategories[index]
      selectedCategoryDisplayedNameSaved = selectedCategorySaved.displayedTitle
      selectedCategoryTitle = selectedCategorySaved.title
      // console.log('selected category: ', selectedCategoryTitle)
  };

  const handleDifficultySelect = async (difficultyLevel) => {
    try {
      // console.log('handleDifficultySelect 啟動')
        const itemList = getListByCategoryAndDifficulty(selectedCategoryTitle, difficultyLevel);
        // console.log('new itemList: ', itemList)
        for (const itemName of itemList) {  // 遍歷 animalList
        const prompt = generatePrompt(selectedCategoryTitle, itemName);
        
        // console.log('prompt:', prompt)
      
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
            negativePrompt: 'duplicate, multiple animals, repeated animal pattern, nude, nsfw, text, letters, too many feet, too many fingers, long neck, 2 heads, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs, animal patterns, patterns,',
            numImages: 1,
            itemName: `${itemName}`,
            userId: user.id,
            collectionId: collectionId,
            category: selectedCategoryDisplayedNameSaved,
          }),
        });
  
        const data = await response.json();
        // const generationId = await data.sdGenerationJob.generationId
        // console.log('fetchData response:', data); 
          
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
              title={bookCategory.displayedTitle}
              subtitle={bookCategory.subtitle}
              selected={selectedCard === index}
              onSelect={() => handleCardSelect(index)} 
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default CreatePage;
