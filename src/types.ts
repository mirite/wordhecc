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

export interface IKeyboard extends Array<ILetter> {}
export interface IAttempt extends Array<ILetter> {}
