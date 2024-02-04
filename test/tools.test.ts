import expect from "expect";
import {
  checkWord,
  checkWordOfTheDay,
  findIncludedCharacters,
  findMatchingCharacters,
  removeCorrectValues,
} from "../src/helpers/wordChecker";
import { getWord } from "../src/helpers/dictionary/dictionaryLoader";
import { ELetterState } from "../src/types";

describe("tool", function () {
  describe("Check word", function () {
    it("Should return true when word matches", function () {
      expect(checkWord("HELLO", "HELLO")).toBe(true);
    });
    it("Should return true, even if the word matches, even if the cases dont", function () {
      expect(checkWord("HELLO", "hello")).toBe(true);
    });
    it("Should return false if the word do not match", function () {
      expect(checkWord("HELL", "HELLO")).toBe(false);
    });
  });

  describe("Find matching characters", function () {
    it("Should return all letters as matching for the same word given", () => {
      const result = findMatchingCharacters("HELLO", "HELLO");
      expect(result.every((l) => l)).toBe(true);
    });
    it("Should return all letters as matching for the same word given, but in different cases", () => {
      const result = findMatchingCharacters("HELLO", "HeLlO");
      expect(result.every((l) => l)).toBe(true);
    });
    it("Should return no letters as matching for a word with no common character positions", () => {
      const result = findMatchingCharacters("GOODBYE", "HELLO");
      expect(result.some((l) => l)).toBe(false);
    });
    it("Should return some letters as matching for a word with some common characters", () => {
      const result = findMatchingCharacters("HOLO", "HELLO");
      expect(result.some((l) => l)).toBe(true);
      expect(result.every((l) => l)).toBe(false);
    });
    it("Should not return all letters as matching for a word that is longer than actual word, but shares the same root", () => {
      const result = findMatchingCharacters("HELLO", "HELL");
      expect(result.every((l) => l)).toBe(false);
    });
    it("Should return all letters as matching for a word that is shorter than the actual word, but shares the same root", () => {
      const result = findMatchingCharacters("HELL", "HELLO");
      expect(result.every((l) => l)).toBe(true);
    });
  });

  describe("Find included characters", function () {
    it("Should return all characters as included for the same word", function () {
      const result = findIncludedCharacters("HELLO", "HELLO");
      expect(result.every((l) => l)).toBe(true);
    });
    it("Should return all characters as included for a word containing all the same letters in a different order", function () {
      const result = findIncludedCharacters("HELP", "PLEH");
      expect(result.every((l) => l)).toBe(true);
    });
    it("Should return no characters as included for a word with no common letters", function () {
      const result = findIncludedCharacters("HOLP", "MAYBE");
      expect(result.some((l) => l)).toBe(false);
    });
    it("Should return only the first character as in word when there is multiple in the guess, but only one in the word.", function () {
      const result = findIncludedCharacters("JEEP", "JEP");
      expect(result[1]).toBe(true);
      expect(result[2]).toBe(false);
    });
  });
});

describe("Get word", function () {
  it("Should return a word", function () {
    expect(getWord()).toBeTruthy();
  });
});

describe("Remove correct values", function () {
  it("Should remove the letters in the positions that are true", function () {
    expect(removeCorrectValues("HELP", [false, true, true, false])).toEqual("H__P");
  });
});

describe("Check word", function () {
  it("Should return all in places for the correct word", function () {
    const result = checkWordOfTheDay("HELLO", "HELLO");
    expect(result.every((l) => l.state === ELetterState.inPosition)).toBeTruthy();
  });
  it("Should return none in word for no shared characters", function () {
    const result = checkWordOfTheDay("HELLO", "A");
    expect(result.some((l) => l.state === ELetterState.inPosition)).toBeFalsy();
  });
  it("Should return all in word for words with shared characters in a different order", function () {
    const result = checkWordOfTheDay("HELP", "PLEH");
    expect(result.every((l) => l.state === ELetterState.inWord)).toBeTruthy();
  });
  it("Should not show a letter as in word, if it already had an instance in position", function () {
    const result = checkWordOfTheDay("RABBIT", "GERBIL");
    expect(result[2].state).toEqual(ELetterState.notInWord);
    expect(result[3].state).toEqual(ELetterState.inPosition);
  });
});
