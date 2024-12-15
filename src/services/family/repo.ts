import FamilyApi from "@remote/family-api";
import dayjs from "dayjs";

import { Family } from "@models";
import { PAGODA_ID } from "@utils/constant";

export const FamilyService = {
  getAllFamilies: async () => {
    try {
      const response = await FamilyApi.getAllFamilies();
      const result = response.docs.map(
        (doc) =>
          <Family>{
            id: parseInt(doc.id, 10),
            address: doc.data().address,
            members: doc.data().members,
          },
      );
      return result;
    } catch (error) {
      console.log("Error on get all families: ", error);
      return [];
    }
  },

  updateFamilyProfile: async (family: Family): Promise<boolean> => {
    try {
      const uploadFamilyProfile = { ...family };
      if (family.id === -1) {
        const timestamp = dayjs().unix();
        uploadFamilyProfile.id = timestamp;
        await FamilyApi.addFamily(PAGODA_ID, uploadFamilyProfile);
        console.log("created family: ", uploadFamilyProfile.id);
      } else {
        await FamilyApi.updateFamilyProfile(PAGODA_ID, uploadFamilyProfile);
        console.log("updated family: ", family.id);
      }
      return true;
    } catch (error) {
      console.log("Error on update family profile: ", error);
      return false;
    }
  },

  addFamilyWithId: async (family: Family): Promise<boolean> => {
    try {
      await FamilyApi.addFamily(PAGODA_ID, family);
      console.log("updated family: ", family.id);
      return true;
    } catch (error) {
      console.log("Error on add new family profile", error);
      return false;
    }
  },

  addHouseHold: async (families: Family[]): Promise<boolean> => {
    try {
      await FamilyApi.addHouseHold(PAGODA_ID, families);

      // console.log("updated family: ", family.id);
      return true;
    } catch (error) {
      console.log("Error on add new family profile", error);
      return false;
    }
  },
};
