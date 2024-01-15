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
      if (queryTxt.length < 3) {
        throw new Error("Query string is too short");
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
        await FamilyApi.addFamily(pagodaID, uploadFamilyProfile);
        console.log("created family: ", uploadFamilyProfile.id);
      } else {
        await FamilyApi.updateFamilyProfile(pagodaID, uploadFamilyProfile);
        console.log("updated family: ", family.id);
      }
      return true;
    } catch (error) {
      console.log("Error on update family profile: ", error);
      return false;
    }
  },
};
