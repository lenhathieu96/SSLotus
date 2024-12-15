import fs from "fs";

const assetsConfig = [
  {
    pathFolder: process.cwd() + "/src/assets/svgs",
  },
];
let stringifyImport = "";

const generateAsset = (assetConfig) => {
  const PATH_FOLDER_SVG = assetConfig.pathFolder;

  const _handleString = (text) => {
    const arraySplitString = text.trim().split(/[-_]/);

    return arraySplitString.reduce((pre, next) => {
      return pre + next.slice(0, 1).toUpperCase() + next.slice(1, next.length);
    }, "");
  };

  const filesName = [];

  /// Read list svg files
  fs.readdirSync(PATH_FOLDER_SVG).forEach((file) => {
    const regexSplitDot = RegExp(/^(.+?)\./gm);

    const test = regexSplitDot.exec(file.trim());

    if (test !== null && test[1] !== "index") {
      filesName.push({ path: file, name: _handleString(test[1]) });
    }
  });
  filesName.forEach((file) => {
    stringifyImport += `
import ${file.name}Icon from "../assets/svgs/${file.path}?react"
/** How it display
*
* ![${file.name}](${assetConfig.pathFolder + "/" + file.path})
* */
export const ${file.name} = ${file.name}Icon
`;
  });

  if (stringifyImport !== "") {
    const newContent =
      "// This file is auto-generated. Do not edit manually.\n\n";
    fs.promises
      .writeFile("src/assets/svgs.ts", newContent + stringifyImport)
      .then(() =>
        console.log("✅  Svgs shortcuts were generated successfully"),
      );
  }
};

assetsConfig.forEach(generateAsset);
