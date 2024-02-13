import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { Family } from "@models";

import firestore from "./firebase-app";

const Collection = collection(firestore, "pagoda", "TDHP", "families");

const FamilyApi = {
  getFamiliesByID: async (id: number) => {
    const q = query(Collection, where("id", "==", id));
    return await getDocs(q);
  },

  getAllFamilies: async () => {
    return await getDocs(collection(firestore, "pagoda", "TDHP", "families"));
  },

  getFamiliesByAddress: async (queryTxt: string) => {
    const q = query(
      Collection,
      orderBy("address"),
      where("address", ">=", queryTxt.toUpperCase() + "~"),
      where("address", "<=", queryTxt.toUpperCase() + "~"),
    );
    return await getDocs(q);
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
