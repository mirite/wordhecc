/**
 * @file This is migrating from a netlify function to client-side code. Hence the weirdness.
 */
import {getWord} from "../../helpers/dictionary/dictionaryLoader";
import {checkWord, checkWordOfTheDay} from "../../helpers/wordChecker";
import type {ICheckWordResponse} from "../../types";

export const handler = (attempt: string):ICheckWordResponse => {
    const complete = checkWord(attempt, getWord());

  return {
      complete,
      result: checkWordOfTheDay(attempt),
    }

};
