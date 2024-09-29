import wordListRaw from "./dict.json";
import wordListAlpha from "./dictAlpha.json";

/**
 *
 */
function getDaysSince(): number {
  const date1 = new Date("03/26/2022");
  const today = new Date();

  const differenceInTime = today.getTime() - date1.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.floor(differenceInDays);
}

/**
 *
 */
export function getWord(): string {
  return wordListRaw[getDaysSince()];
}

/**
 *
 */
export function getDictionary() {
  return wordListAlpha;
}

/**
 *
 * @param word
 */
export function isInDictionary(word: string) {
  return getDictionary().includes(word.toLowerCase());
}
