import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import CurrentAttempt from './CurrentAttempt';
import {
	ELetterState,
	IAttempt,
	ICheckWordResponse,
	IKeyboard,
	ILetter,
} from './types';
import Attempt from './Attempt';
import PreviousAttempts from './PreviousAttempts';

const letters = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

function createStartingKeyboard(keyboardCharacters: string[][]): IKeyboard {
	const rows = keyboardCharacters.map((row, rIndex) => {
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

const App = () => {
	const [solved, setSolved] = useState(false);

	const [keyboard, setKeyboardState] = useState<IKeyboard>(
		createStartingKeyboard(letters)
	);
	const [attempt, setAttempt] = useState<IAttempt>([]);
	const [previousAttempts, setPreviousAttempts] = useState<IAttempt[]>([]);
	function handleClick(letter: ILetter) {
		// const items = [...keyboard];
		// const letterToUpdate = items.findIndex(
		// 	(key) => key.character === letter.character
		// );
		// const newLetterState = { ...items[letterToUpdate] };
		// newLetterState.state = ELetterState.notInWord;
		// items[letterToUpdate] = newLetterState;
		// setKeyboardState(items);
		addLetterToAttempt(letter);
	}

	function addLetterToAttempt(letter: ILetter) {
		const items = [...attempt];
		if (items.length >= 9) return;
		items.push(letter);
		setAttempt(items);
	}

	function removeLetterFromAttempt() {
		const items = [...attempt];
		items.pop();
		setAttempt(items);
	}

	function submitAttempt() {
		const attemptAsString = attempt.reduce(
			(newString, currentLetter) => newString + currentLetter.character,
			''
		);
		fetch('/.netlify/functions/check', {
			method: 'POST',
			body: JSON.stringify({ attempt: attemptAsString }),
		})
			.then((result) => result.json())
			// eslint-disable-next-line no-console
			.then((response) => {
				const responseObj = response as ICheckWordResponse;
				if (responseObj.complete) setSolved(true);
				const oldPreviousAttempts = [...previousAttempts];
				oldPreviousAttempts.push(responseObj.result);
				setPreviousAttempts(oldPreviousAttempts);
				setAttempt([]);
			});
	}

	if (solved) {
		return <h1>You did it!</h1>;
	}

	return (
		<div className="container-xxl">
			<PreviousAttempts previousAttempts={previousAttempts} />
			<CurrentAttempt attempt={attempt} />
			<Keyboard
				keyboardState={keyboard}
				onKeyClick={(letter: ILetter) => handleClick(letter)}
				onBackClick={removeLetterFromAttempt}
				onEnterClick={submitAttempt}
			/>
		</div>
	);
};

export default App;
