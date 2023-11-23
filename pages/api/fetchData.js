import db from '../../app/components/database/database';
import { collection, addDoc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    // 從環境變量中讀取 API 密鑰
    const apiKey = process.env.API_KEY;
    
    // 檢查是否有 API 密鑰
    if (!apiKey) {
      return res.status(500).json({ message: 'API key is not defined on the server.' });
    }
  
    // 提取請求體數據
    const { imageHeight, imageWidth, albedoXLmodelId, prompt, negativePrompt, numImages, itemName , userId, collectionId, category } = req.body;

    const postOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`, // 使用服務器端 API 密鑰
      },
      body: JSON.stringify({
        height: imageHeight,
        modelId: albedoXLmodelId,
        prompt: prompt,
        width: imageWidth,
        negative_prompt: negativePrompt,
        num_images: numImages,
      }),
    };

  
    try {
      // 向第三方 API 發送請求
      const thirdPartyResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', postOptions);
      const data = await thirdPartyResponse.json();
      console.log('response from 3rd party API: ', data)
      
      // 檢查第三方 API 的響應
      if (!thirdPartyResponse.ok) {
        return res.status(thirdPartyResponse.status).json({ message: 'Error from POST API', data });
      }

      
  
      // 返回數據到客戶端
      const generationId = await data.sdGenerationJob.generationId
      console.log('API Fetch generationId:', generationId);

      if (generationId && userId){
        const imagesCollectionRef = collection(db, "images");
        
    
          const newImagesDocRef = await addDoc(imagesCollectionRef, {
            userId: userId,
            generationId: generationId,
            documentId: '', // 在這裡保留一個欄位來存儲 docRef.id
            imageUrl: '',
            collectionId: collectionId,
            itemName: itemName,
            category: category,
            collectionName: category+' Collection',
    
          });
          await updateDoc(newImagesDocRef, {
            documentId: newImagesDocRef.id,
          });
          console.log('New image data added with Firestore-generated ID:', newImagesDocRef.id);
        
      }
     
      return res.status(200).json('generationId is saved to DB');
    
    
    } catch (error) {
      // 處理錯誤
      return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }
  

