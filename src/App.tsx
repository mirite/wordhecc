import React, { useState } from 'react';
import Keyboard from './Keyboard';
import CurrentAttempt from './CurrentAttempt';
import {
	ELetterState,
	IAttempt,
	ICheckWordResponse,
	IKeyboard,
	ILetter,
} from './types';
import PreviousAttempts from './PreviousAttempts';
import { isInDictionary, stringFromAttempt } from './tools';

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
		addLetterToAttempt(letter);
	}

	function updateKeys(response: ICheckWordResponse) {
		const keys = [...keyboard];
		const { result } = response;
		for (const key of keys) {
			const match = result.find(
				(char) => char.character === key.character
			);
			if (!match) continue;
			if (match.state > key.state) {
				key.state = match.state;
			}
		}

		setKeyboardState(keys);
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
		const attemptAsString = stringFromAttempt(attempt);
		fetch('/.netlify/functions/check', {
			method: 'POST',
			body: JSON.stringify({ attempt: attemptAsString }),
		})
			.then((result) => result.json())
			// eslint-disable-next-line no-console
			.then((response) => {
				updateAttempts(response as ICheckWordResponse);
				updateKeys(response as ICheckWordResponse);
			});
	}

	const updateAttempts = (response: ICheckWordResponse) => {
		if (response.complete) setSolved(true);
		const oldPreviousAttempts = [...previousAttempts];
		oldPreviousAttempts.push(response.result);
		setPreviousAttempts(oldPreviousAttempts);
		setAttempt([]);
	};

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
				isEnterEnabled={isInDictionary(stringFromAttempt(attempt))}
				isBackspaceEnabled={attempt.length > 0}
			/>
		</div>
	);
};

export default App;
