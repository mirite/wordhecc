import fs from "fs";

import wordsToUseFile from "./wordsToUse.json";

const wordsInDictFile = fs.readFileSync("./wordsInDictionary.txt").toString();
const wordsToUse = [];
const wordsInDict = [];

for (const word of wordsInDictFile.split("\n")) {
  if (word.length < 9 && !word.match(/[^a-z]/gi)) {
    wordsInDict.push(word.toLowerCase());
  }
}

for (const word of wordsToUseFile) {
  if (word.length < 9 && !word.includes("-")) {
    if (!wordsInDict.includes(word.toLowerCase())) throw new Error(`${word} is not in dictionary`);
    wordsToUse.push(word.toLowerCase());
  }
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

fs.writeFileSync("./dictAlpha.json", JSON.stringify(wordsInDict));
shuffleArray(wordsToUse);
fs.writeFileSync("./dict.json", JSON.stringify(wordsToUse));
console.log(`Done! Wordlist: ${wordsToUse.length}. Dictionary: ${wordsInDict.length}`);
