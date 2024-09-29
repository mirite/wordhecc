import type { IAttempt } from "../types";
import { ELetterState } from "../types";

import { getWord } from "./dictionary/dictionaryLoader";

/**
 *
 * @param attemptedWord
 * @param actualWord
 */
export function checkWord(attemptedWord: string, actualWord: string) {
  const cleanedAttemptedWord = attemptedWord.toUpperCase();
  const cleanedActualWord = actualWord.toUpperCase();
  return cleanedAttemptedWord === cleanedActualWord;
}

/**
 *
 * @param attemptedWord
 * @param actualWord
 */
export function findMatchingCharacters(attemptedWord: string, actualWord: string): Array<boolean> {
  const output: Array<boolean> = [];

  const attemptArray = attemptedWord.toUpperCase().split("");
  const actualArray = actualWord.toUpperCase().split("");

  for (let x = 0; x < attemptArray.length; x++) {
    output.push(attemptArray[x] === actualArray[x]);
  }
  return output;
}

/**
 *
 * @param attemptedWord
 * @param actualWord
 */
export function findIncludedCharacters(attemptedWord: string, actualWord: string): Array<boolean> {
  const output: Array<boolean> = [];

  const attemptArray = attemptedWord.toUpperCase().split("");
  const actualArray = actualWord.toUpperCase().split("");

  for (let x = 0; x < attemptArray.length; x++) {
    const matchIndex = actualArray.findIndex((l) => l === attemptArray[x]);
    if (matchIndex >= 0 && attemptArray[x] !== "_") {
      actualArray[matchIndex] = "";
      output.push(true);
    } else {
      output.push(false);
    }
  }
  return output;
}

/**
 *
 * @param attempt
 * @param lettersInCorrectPosition
 */
export function removeCorrectValues(attempt: string, lettersInCorrectPosition: Array<boolean>) {
  const wordAsArray = attempt.split("");
  let output = "";
  for (let x = 0; x < wordAsArray.length; x++) {
    output += lettersInCorrectPosition[x] ? "_" : wordAsArray[x];
  }
  return output;
}

/**
 *
 * @param attempt
 * @param override
 */
export function checkWordOfTheDay(attempt: string, override?: string): IAttempt {
  const actualWord = override ?? getWord();
  const result: IAttempt = [];
  const lettersInCorrectPosition = findMatchingCharacters(attempt, actualWord);
  const attemptWithCorrectValuesRemoved = removeCorrectValues(attempt, lettersInCorrectPosition);
  const actualWordWithCorrectValuesRemoved = removeCorrectValues(actualWord, lettersInCorrectPosition);
  const lettersInWrongPosition = findIncludedCharacters(
    attemptWithCorrectValuesRemoved,
    actualWordWithCorrectValuesRemoved,
  );

  for (let x = 0; x < attempt.length; x++) {
    let letterState: ELetterState;
    if (lettersInCorrectPosition[x]) {
      letterState = ELetterState.inPosition;
    } else if (lettersInWrongPosition[x]) {
      letterState = ELetterState.inWord;
    } else {
      letterState = ELetterState.notInWord;
    }
    result.push({ character: attempt[x], state: letterState });
  }
  return result;
}

/**
 *
 * @param attempt
 */
export function stringFromAttempt(attempt: IAttempt): string {
  return attempt.reduce((newString, currentLetter) => newString + currentLetter.character, "");
}
