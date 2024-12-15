// import fs from "vite-plugin-fs/browser";

// import { Family } from "@models";
// import { FamilyService } from "@services";

// const JSON_FILE_PATH = "data.json";

// export const getAllFamiliesToJson = async () => {
//   try {
//     const data = await FamilyService.getAllFamilies();
//     const jsonData = JSON.stringify(data);
//     await fs.writeFile("data.json", jsonData);
//   } catch (error) {
//     console.log("Error on set all families to JSON file: ", error);
//   }
// };

// export const addHouseHoldsFromJSon = async () => {
//   try {
//     const data = await fs.readFile(JSON_FILE_PATH);
//     const parsedData: Family[] = JSON.parse(data);
//     for (const family of parsedData.slice(3, 4)) {
//       await FamilyService.addHouseHold([family]);
//     }
//   } catch (error) {
//     console.log("Error on add house hold from JSON file: ", error);
//   }
// };
