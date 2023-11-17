import db from '../../app/components/database/database';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";


export default async function handler(req, res) {
    // 打印請求方法和請求頭
    // console.log(`Received a ${req.method} request with headers:`, req.headers);

    // 根據請求的內容類型，選擇不同的方式來解析數據
    if (req.method === 'POST') {
        // 打印 POST 請求的 body
        // console.log('images array:', req.body.data.object.images)
        console.log('images url:', req.body.data.object.images[0].url)
        const recievedImageUrl = req.body.data.object.images[0].url
        const recievedGenerationId =  req.body.data.object.id

    try{
        if (recievedImageUrl && recievedGenerationId){
            
            const imagesCollectionRef = collection(db, "images");
            const q = query(imagesCollectionRef, where("generationId", "==", recievedGenerationId));

            // Execute the query
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref;
                    // Update the document
                    await updateDoc(docRef, {
                        imageUrl: recievedImageUrl
                    });
            
                    console.log('Image URL is saved to DB:', docRef.id);
                ;
            } 
        }
    }catch (error){
        console.error('saving image url error: ', error)

    }


    } 
    else {
        // 如果收到其他 HTTP 方法，返回不允許的方法錯誤
        res.setHeader('Allow', 'POST, GET');
        return res.status(405).end('Method Not Allowed');
    }

    // 確認收到請求
    res.status(200).json({ message: 'Webhook received' });
}
