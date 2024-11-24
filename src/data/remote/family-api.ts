import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Family } from "@models";

import firestore from "./firebase-app";

const Collection = collection(firestore, "pagoda", "TDHP", "families");

const FamilyApi = {
  getAllFamilies: async () => {
    return await getDocs(Collection);
  },

  updateFamilyProfile: async (pagodaID: string, family: Family) => {
    const docRef = doc(
      firestore,
      "pagoda",
      pagodaID,
      "families",
      family.id.toString(),
    );

    return await updateDoc(docRef, {
      ...family,
      appointment: family.appointment ?? null,
    });
  },

  addFamily: async (pagodaID: string, family: Family) => {
    const docRef = doc(
      firestore,
      "pagoda",
      pagodaID,
      "families",
      family.id.toString(),
    );
    return await setDoc(docRef, family);
  },
};

export default FamilyApi;
