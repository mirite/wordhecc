import type { IKeyboard, ILetter } from "../types";
import { ELetterState } from "../types";

const letters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

/**
 *
 * @param key
 */
export function isKeyOnKeyboard(key: string) {
  return letters.flat(1).includes(key.toUpperCase());
}

/**
 *
 */
export function createStartingKeyboard(): IKeyboard {
  const rows = letters.map((row, rIndex) => {
    return row.map((letter): ILetter => {
      return {
        character: letter,
        row: rIndex,
        state: ELetterState.unused,
      };
    });
  });
  return rows.flat(1);
}
