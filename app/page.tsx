"use client";
import { Flex } from "@chakra-ui/react";
// import { addDoc, collection, getDocs } from "firebase/firestore";

// import { db } from "./firebase/config";

// type Trade = {
//   instrumentName: string;
//   amount: number;
//   amountInUsd: number;
//   stage: "entry" | "in-trade" | "close" | "post-mortem";
// };

export default function Home() {
  // const addTodo = async (e) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("docRef", docRef);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // const fetchUsers = async () => {
  //   await getDocs(collection(db, "users")).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log("todos", newData);
  //   });
  // };
  return (
    <Flex as="main" w="full" h="full">
      Journal App test gitignore
      {/* <Button onClick={addTodo}>Add data</Button> */}
    </Flex>
  );
}
