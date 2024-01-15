import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
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

  getFamiliesByAddress: async (queryTxt: string) => {
    const q = query(
      Collection,
      orderBy("address"),
      startAt(queryTxt.toUpperCase()),
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

    return await updateDoc(docRef, family);
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
