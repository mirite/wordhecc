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
		if (actualArray.includes(attemptArray[x])) {
			output.push(true);
		} else {
			output.push(false);
		}
	}
	return output;
}

const wordsRaw = require('./dict.json');

function getDaysSince():number {

	const date1 = new Date("03/26/2021");
	const today = new Date();

	const differenceInTime = today.getTime() - date1.getTime();

	const differenceInDays = differenceInTime / (1000 * 3600 * 24);
	return Math.floor(differenceInDays);
}

export function getWord(): string {
	return wordsRaw[getDaysSince()];
}
