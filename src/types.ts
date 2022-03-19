export enum ELetterState {
  unused,
notInWord,
  inWord,
  inPosition,
}

export interface ILetter {
  character: string;
  state: ELetterState;
  row: number;
}

export interface IAttemptResult {
  lettersInCorrectPosition: string[],
  lettersInWrongPosition: string[],
  lettersNotInWord: string[],
}

export interface IKeyboard extends Array<ILetter> {}
export interface IAttempt extends Array<ILetter> {}
