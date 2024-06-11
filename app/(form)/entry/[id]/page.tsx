import { doc, getDoc } from "firebase/firestore";
import React from "react";

import { db } from "@/app/firebase/config";

import EntryForm from "../form";

export default async function EntryFormPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const docRef = doc(db, "trades", id);
  const docSnap = await getDoc(docRef);
  const trade = { ...docSnap.data(), id } as Trade;

  return <EntryForm trade={trade} />;
}
