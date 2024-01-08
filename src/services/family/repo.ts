import FamilyApi from "@remote/family-api";
import Helper from "@utils/helper";
import dayjs from "dayjs";

import { Family } from "@models";

export const FamilyService = {
  searchFamily: async (queryTxt: string): Promise<Family[]> => {
    try {
      if (!queryTxt) {
        throw new Error("Query string is null");
      }
      const isNumericQueryTxt = Helper.isNumeric(queryTxt);
      const response = isNumericQueryTxt
        ? await FamilyApi.getFamiliesByID(parseInt(queryTxt, 10))
        : await FamilyApi.getFamiliesByAddress(queryTxt);
      const result = response.docs.map(
        (doc) =>
          <Family>{
            id: parseInt(doc.id, 10),
            address: doc.data().address,
            members: doc.data().members,
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

  updateFamilyProfile: async (family: Family): Promise<boolean> => {
    try {
      const pagodaID = "TDHP";
      const uploadFamilyProfile = { ...family };
      if (family.id === -1) {
        const timestamp = dayjs().unix();
        uploadFamilyProfile.id = timestamp;
      }
      await FamilyApi.updateFamilyProfile(pagodaID, family);
      return true;
    } catch (error) {
      console.log("Error on update family profile: ", error);
      return false;
    }
  },
};
