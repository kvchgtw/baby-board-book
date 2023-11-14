'use client'
import React from 'react'

export default function CreatingPage() {
  // 定義處理點擊事件的函數
  const handleFetchClick = async () => {
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
      <div>this is create page</div>
      {/* 綁定 onClick 事件到 handleFetchClick 函數 */}
      <button onClick={handleFetchClick}>Fetch</button>
    </>
  )
}
