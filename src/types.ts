/**
 * Colour states for letters.
 */
export enum ELetterState {
  unused,
  notInWord,
  inWord,
  inPosition,
}

export type IAttempt = Array<ILetter>;

export interface ICheckWordResponse {
  complete: boolean;
  result: IAttempt;
}

export type IKeyboard = Array<ILetter>;
export interface ILetter {
  character: string;
  row?: number;
  state: ELetterState;
}

export const stateClasses: { [key in ELetterState]: string } = {
  [ELetterState.inPosition]: "inPosition",
  [ELetterState.inWord]: "inWord",
  [ELetterState.notInWord]: "notInWord",
  [ELetterState.unused]: "unused",
};
