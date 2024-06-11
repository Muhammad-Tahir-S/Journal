import { doc, getDoc } from "firebase/firestore";

import { db } from "./config";

export async function getData<T>(collection: string, pathSegments?: string[]) {
  const docRef = doc(db, collection, "SF");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
