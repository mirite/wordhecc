/**
 * @file This is migrating from a netlify function to client-side code. Hence the weirdness.
 */
import { getWord } from "../../helpers/dictionary/dictionaryLoader.js";
import { checkWord, checkWordOfTheDay } from "../../helpers/wordChecker.js";
import type { ICheckWordResponse } from "../../types.js";

export const handler = (attempt: string): ICheckWordResponse => {
  const complete = checkWord(attempt, getWord());

  return {
    complete,
    result: checkWordOfTheDay(attempt),
  };
};
