import wordListRaw from "./dict.json" with { type: "json" };
import wordListAlpha from "./dictAlpha.json" with { type: "json" };

/**
 *
 */
export function getDictionary() {
  return wordListAlpha;
}

/**
 *
 */
export function getWord(): string {
  return wordListRaw[getDaysSince()] ?? "Over";
}

/**
 *
 * @param word
 */
export function isInDictionary(word: string) {
  return getDictionary().includes(word.toLowerCase());
}

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
