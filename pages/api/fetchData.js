// pages/api/fetchData.js

export default async function handler(req, res) {
    // 只允許 POST 請求
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
    const { imageHeight, imageWidth, albedoXLmodelId, prompt, negativePrompt, numImages } = req.body;
  
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

    const getImageOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${apiKey}`
        }
      };

  
    try {
      // 向第三方 API 發送請求
      const thirdPartyResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', postOptions);
      const data = await thirdPartyResponse.json();
      
      // 檢查第三方 API 的響應
      if (!thirdPartyResponse.ok) {
        return res.status(thirdPartyResponse.status).json({ message: 'Error from POST API', data });
      }
  
      // 返回數據到客戶端
      const generationId = data.sdGenerationJob.generationId
      console.log('generationId:', generationId);
      // if (generationId){

      //   const getImageUrlResponse = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations/'+generationId, getImageOptions)
      //   const getImageUrldata = await getImageUrlResponse.json();

      //   if (!getImageUrlResponse.ok) {
      //       return res.status(getImageUrlResponse.status).json({ message: 'Error from getImageUrl API', getImageUrldata });
      //     }
      //   console.log(getImageUrldata.generated_images[0].url)
      //   return res.status(200).json(getImageUrldata);
      // }
      return res.status(200).json(data);
    
    
    } catch (error) {
      // 處理錯誤
      return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }
  

