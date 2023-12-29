import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

import firestore from "./firebase-app";

const Collection = collection(firestore, "family");

const FamilyApi = {
  getFamiliesByID: async (id: string) => {
    const q = query(Collection, where("id", "==", parseInt(id, 10)));
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
};

export default FamilyApi;
