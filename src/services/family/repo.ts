import FamilyApi from "@remote/family-api";
import dayjs from "dayjs";

import { Family } from "@models";

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

  addFamilyWithId: async (family: Family): Promise<boolean> => {
    try {
      const pagodaID = "TDHP";
      await FamilyApi.addFamily(pagodaID, family);
      console.log("updated family: ", family.id);
      return true;
    } catch (error) {
      console.log("Error on add new family profile", error);
      return false;
    }
  },
};
