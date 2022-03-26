import { ELetterState, IAttempt } from '../types';

export function checkWord(attemptedWord: string, actualWord: string) {
	const cleanedAttemptedWord = attemptedWord.toUpperCase();
	const cleanedActualWord = actualWord.toUpperCase();
	return cleanedAttemptedWord === cleanedActualWord;
}

export function findMatchingCharacters(
	attemptedWord: string,
	actualWord: string
): Array<boolean> {
	const output: Array<boolean> = [];

	const attemptArray = attemptedWord.toUpperCase().split('');
	const actualArray = actualWord.toUpperCase().split('');

	for (let x = 0; x < attemptArray.length; x++) {
		output.push(attemptArray[x] === actualArray[x]);
	}
	return output;
}

export function findIncludedCharacters(
	attemptedWord: string,
	actualWord: string
): Array<boolean> {
	const output: Array<boolean> = [];

	const attemptArray = attemptedWord.toUpperCase().split('');
	const actualArray = actualWord.toUpperCase().split('');

	for (let x = 0; x < attemptArray.length; x++) {
		const matchIndex = actualArray.findIndex((l) => l === attemptArray[x]);
		if (matchIndex >= 0 && attemptArray[x] !== '_') {
			actualArray[matchIndex] = '';
			output.push(true);
		} else {
			output.push(false);
		}
	}
	return output;
}

const wordListRaw = require('./dict.json');
const wordListAlpha = require('./dictAlpha.json');

function getDaysSince(): number {
	const date1 = new Date('03/26/2022');
	const today = new Date();

	const differenceInTime = today.getTime() - date1.getTime();

	const differenceInDays = differenceInTime / (1000 * 3600 * 24);
	return Math.floor(differenceInDays);
}

export function getWord(): string {
	return wordListRaw[getDaysSince() + 23];
}

export function removeCorrectValues(
	attempt: string,
	lettersInCorrectPosition: Array<boolean>
) {
	const wordAsArray = attempt.split('');
	let output = '';
	for (let x = 0; x < wordAsArray.length; x++) {
		output += lettersInCorrectPosition[x] ? '_' : wordAsArray[x];
	}
	return output;
}

export function checkWordOfTheDay(
	attempt: string,
	override?: string
): IAttempt {
	const actualWord = override ?? getWord();
	const result: IAttempt = [];
	const lettersInCorrectPosition = findMatchingCharacters(
		attempt,
		actualWord
	);
	const attemptWithCorrectValuesRemoved = removeCorrectValues(
		attempt,
		lettersInCorrectPosition
	);
	const actualWordWithCorrectValuesRemoved = removeCorrectValues(
		actualWord,
		lettersInCorrectPosition
	);
	const lettersInWrongPosition = findIncludedCharacters(
		attemptWithCorrectValuesRemoved,
		actualWordWithCorrectValuesRemoved
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

export function getDictionary() {
	return wordListAlpha;
}

export function isInDictionary(word: string) {
	return getDictionary().includes(word.toLowerCase());
}

export function stringFromAttempt(attempt: IAttempt): string {
	return attempt.reduce(
		(newString, currentLetter) => newString + currentLetter.character,
		''
	);
}
