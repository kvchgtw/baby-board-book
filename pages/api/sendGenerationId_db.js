// import db from '../../app/components/database/database';
// import { collection, addDoc, updateDoc } from "firebase/firestore";

// export default async function handler(req, res) {
//     // 只允許 POST 請求
//     try{
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }
    
//     // console.log(req.body)
//     const generationId = await req.body.generationId
//     const userId = await req.body.userId
//     //操作DB

//     if (generationId && userId){
//         const imagesCollectionRef = collection(db, "images");
        
    
//           const newImagesDocRef = await addDoc(imagesCollectionRef, {
//             userId: userId,
//             generationId: generationId,
//             documentId: '', // 在這裡保留一個欄位來存儲 docRef.id
//             imageUrl: '',
//             collectionId: ''
    
//           });
//           await updateDoc(newImagesDocRef, {
//             documentId: newImagesDocRef.id,
//           });
//           console.log('New image data added with Firestore-generated ID:', newImagesDocRef.id);
        
//       }



//     return res.json({ message: 'image generationId data created in DB' });
//     } catch (error){
//         console.error('receiving generationId error: ',error)
//     }
   
//   }
  

