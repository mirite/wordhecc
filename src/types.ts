/**
 * Colour states for letters.
 */
export enum ELetterState {
  unused,
  notInWord,
  inWord,
  inPosition,
}

export interface ILetter {
  character: string;
  state: ELetterState;
  row?: number;
}

export interface ICheckWordResponse {
  complete: boolean;
  result: IAttempt;
}

export interface IKeyboard extends Array<ILetter> {}
export interface IAttempt extends Array<ILetter> {}

export const stateClasses: { [key in ELetterState]: string } = {
  [ELetterState.unused]: "unused",
  [ELetterState.notInWord]: "notInWord",
  [ELetterState.inPosition]: "inPosition",
  [ELetterState.inWord]: "inWord",
};
