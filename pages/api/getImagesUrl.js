import db from '../../app/components/database/database';
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const userId = req.body.userId;
            const collectionId = req.body.collectionId;

            if (userId) {
                const imagesCollectionRef = collection(db, "images");
                const q = query(imagesCollectionRef, where("userId", "==", userId));

                // 執行查詢
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // 將所有檢索到的文檔數據存儲在一個數組中
                    let imagesData = [];
                    querySnapshot.forEach((doc) => {
                        imagesData.push(doc.data().imageUrl); // 假設每個文檔有一個 'imageUrl' 字段
                    });

                    // 返回數據給前端
                    return res.status(200).json(imagesData);
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
