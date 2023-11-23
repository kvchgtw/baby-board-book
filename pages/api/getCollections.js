import db from '../../app/components/database/database';
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const userId = req.body.userId;

            if (userId) {
                const imagesCollectionRef = collection(db, "images");
                const q = query(imagesCollectionRef, where("userId", "==", userId));

                // 執行查詢
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // 將所有檢索到的文檔數據存儲在一個數組中
                    let collectionsData = [];
                    querySnapshot.forEach((doc) => {
                        let collectionData = {
                            collectionName: doc.data().collectionName, 
                            collectionCoverPhoto: doc.data().imageUrl,
                            collectionId: doc.data().collectionId
                        }
                        if (!collectionsData.some(item => item.collectionId === collectionData.collectionId)) {
                            collectionsData.push(collectionData);
                        }
                    });

                    // 返回數據給前端
                    // console.log(collectionsData)
                    return res.status(200).json(collectionsData);
                } else {
                    console.log('No documents found matching the criteria.');
                    return res.status(404).json({ message: "No images found." });
                }
            } else {
                return res.status(400).json({ message: "Missing userId." });
            }
        } else {
            // 如果收到其他 HTTP 方法，返回不允許的方法錯誤
            res.setHeader('Allow', 'POST');
            return res.status(405).end('Method Not Allowed');
        }
    } catch (error) {
        console.error('Error sending image url to front-end:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


//fake data
// ['https://cdn.leonardo.ai/users/ebdefa85-db06-4d37-adbb-6a43c394aac4/generations/a35591e9-0050-4be1-9b7b-d33af05d2f35/AlbedoBase_XL_high_quality_8K_Ultra_HD_style_cartoon_twodimens_0.jpg', 'https://cdn.leonardo.ai/users/ebdefa85-db06-4d37-adbb-6a43c394aac4/generations/d1d45959-b42e-4609-bc02-ded8c48decb6/AlbedoBase_XL_high_quality_8K_Ultra_HD_style_cartoon_twodimens_0.jpg', 'https://cdn.leonardo.ai/users/ebdefa85-db06-4d37-adbb-6a43c394aac4/generations/b40aef1e-39ea-47ea-a74d-d5e4cedba250/AlbedoBase_XL_high_quality_8K_Ultra_HD_style_cartoon_twodimens_0.jpg', 'https://cdn.leonardo.ai/users/ebdefa85-db06-4d37-adbb-6a43c394aac4/generations/abd9d507-24f9-4f3c-b0fc-0fe61d6e21df/AlbedoBase_XL_high_quality_8K_Ultra_HD_style_cartoon_twodimens_0.jpg']
