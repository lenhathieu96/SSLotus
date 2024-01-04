import FamilyApi from "@remote/family-api";
import Helper from "@utils/helper";

import { Family } from "@models";

export const FamilyService = {
  searchFamily: async (queryTxt: string): Promise<Family[]> => {
    try {
      if (!queryTxt) {
        throw new Error("Query string is null");
      }
      const isNumericQueryTxt = Helper.isNumeric(queryTxt);
      const response = isNumericQueryTxt
        ? await FamilyApi.getFamiliesByID(queryTxt)
        : await FamilyApi.getFamiliesByAddress(queryTxt);
      const result = response.docs.map(
        (doc) =>
          <Family>{
            id: parseInt(doc.id, 10),
            address: doc.data().address,
            members: doc.data().member,
          },
      );

      if (!isNumericQueryTxt) {
        return result.filter((family) => family.address.startsWith(queryTxt));
      }
      return result;
    } catch (error) {
      console.log("Error on search family: ", error);
      return [];
    }
  },

  updateFamilyProfile: (family: Family) => {
    if (family.id === -1) {
      // add new family
    }
  },
};
