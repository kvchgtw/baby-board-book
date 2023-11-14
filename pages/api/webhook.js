// pages/api/webhook.js

export default async function handler(req, res) {
    // 打印請求方法和請求頭
    // console.log(`Received a ${req.method} request with headers:`, req.headers);

    // 根據請求的內容類型，選擇不同的方式來解析數據
    if (req.method === 'POST') {
        // 打印 POST 請求的 body
        // console.log('images array:', req.body.data.object.images)
        console.log('images url:', req.body.data.object.images[0].url)
        const recievedImageUrl = req.body.data.object.images[0].url
        // console.log('generationId:', req.body.data.object.id)
        // console.log('Received webhook with the following data:', req.body);
        


    } 
    else {
        // 如果收到其他 HTTP 方法，返回不允許的方法錯誤
        res.setHeader('Allow', 'POST, GET');
        return res.status(405).end('Method Not Allowed');
    }

    // 確認收到請求
    res.status(200).json({ message: 'Webhook received' });
}


// {
//     type: 'image_generation.complete',
//     object: 'generation',
//     timestamp: 1699499773033,
//     api_version: 'v1',
//     data: {
//       object: {
//         id: 'e50214ba-7528-42e0-8cd2-b7b41dd9aff4', //generationId
//         createdAt: '2023-11-09T03:16:02.423Z',
//         updatedAt: '2023-11-09T03:16:12.841Z',
//         userId: 'ebdefa85-db06-4d37-adbb-6a43c394aac4',
//         public: false,
//         flagged: false,
//         nsfw: false,
//         status: 'COMPLETE',
//         coreModel: 'SD',
//         guidanceScale: 7,
//         imageHeight: 600,
//         imageWidth: 600,
//         inferenceSteps: 30,
//         initGeneratedImageId: null,
//         initImageId: null,
//         initStrength: null,
//         initType: null,
//         initUpscaledImageId: null,
//         modelId: '2067ae52-33fd-4a82-bb92-c2c55e7d2786',
//         negativePrompt: 'nude, nsfw, text, letters, too many feet, too many fingers, long neck, 2 heads, duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,',
//         prompt: 'high quality, 8K Ultra HD, style cartoon, two-dimensional, cute baby fox, colorful, high detailed',
//         quantity: 1,
//         sdVersion: 'SDXL_0_9',
//         tiling: false,
//         imageAspectRatio: null,
//         tokenCost: 0,
//         negativeStylePrompt: 'nude, nsfw, text, letters, too many feet, too many fingers, long neck, 2 heads, duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,',
//         seed: '651315712',
//         scheduler: 'EULER_DISCRETE',
//         presetStyle: null,
//         promptMagic: false,
//         canvasInitImageId: null,
//         canvasMaskImageId: null,
//         canvasRequest: false,
//         api: true,
//         poseImage2Image: false,
//         imagePromptStrength: null,
//         category: null,
//         poseImage2ImageType: null,
//         highContrast: false,
//         apiDollarCost: '13',
//         poseImage2ImageWeight: null,
//         alchemy: null,
//         contrastRatio: null,
//         highResolution: null,
//         expandedDomain: null,
//         promptMagicVersion: null,
//         unzoom: null,
//         unzoomAmount: null,
//         apiKeyId: '3929597e-a1b3-4d14-9ec6-3ead051b362a',
//         photoReal: false,
//         promptMagicStrength: null,
//         photoRealStrength: null,
//         imageToImage: false,
//         controlnetsUsed: false,
//         model: [Object],
//         images: [Array],
//         apiKey: [Object]
//       }
//     }
//   }