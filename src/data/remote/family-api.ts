import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Family } from "@models";
import { PAGODA_ID } from "@utils/constant";

import firestore from "./firebase-app";

const Collection = collection(firestore, "pagoda", PAGODA_ID, "families");

const FamilyApi = {
  getAllFamilies: async () => {
    const q = query(Collection, limit(10));
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

  addHouseHold: async (pagodaId: string, families: Family[]) => {
    try {
      if (families.length === 0) throw new Error("Empty Family");
      const docRef = doc(
        firestore,
        "pagoda",
        pagodaId,
        "100",
        families[0].id.toString(),
      );
      for (const family of families) {
        await setDoc(docRef, family);
      }
    } catch (error) {
      console.log("RP - Error on add house hold: ", error);
    }
  },
};

export default FamilyApi;
