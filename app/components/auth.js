import { auth, currentUser } from "@clerk/nextjs";
import db from './database/database';
import { collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";

export default async function Auth() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (userId) {
    // console.log('userId:', userId);

    // Get the User object when you need access to the user's information
    const user = await currentUser();
    // console.log('user:', user);

    const usersCollectionRef = collection(db, "users");

    // Create a query to find a document with the userId
    const q = query(usersCollectionRef, where("userId", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No user data exists, create a new document with a Firestore-generated ID
      const newUserDocRef = await addDoc(usersCollectionRef, {
        userId: userId,
        imageCollection: '',
        documentId: '', // 在這裡保留一個欄位來存儲 docRef.id
        // Additional user fields can go here
      });
      await updateDoc(newUserDocRef, {
        documentId: newUserDocRef.id,
      });
      console.log('New user data added with Firestore-generated ID:', newUserDocRef.id);
    } else {
      // User data exists, process or display it
      querySnapshot.forEach(doc => {
        // console.log('User data:', doc.id, doc.data());
      });
    }
  }
}
