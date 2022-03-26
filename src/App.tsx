import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import Word from './Word';
import { ELetterState, IAttempt, IKeyboard, ILetter } from './types';

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
	const [word, setWord] = useState('');

	const [keyboard, setKeyboardState] = useState<IKeyboard>(
		createStartingKeyboard(letters)
	);
	const [attempt, setAttempt] = useState<IAttempt>([]);
	function handleClick(letter: ILetter) {
		const items = [...keyboard];
		const letterToUpdate = items.findIndex(
			(key) => key.character === letter.character
		);
		const newLetterState = { ...items[letterToUpdate] };
		newLetterState.state = ELetterState.notInWord;
		items[letterToUpdate] = newLetterState;
		setKeyboardState(items);
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
			.then((wordObj) => setWord(wordObj.word));
	}

	useEffect(() => {
		fetch('/.netlify/functions/word')
			.then((result) => result.json())
			.then((wordObj) => setWord(wordObj.word));
	}, []);

	return (
		<div className="container-xxl">
			<Word word={word} attempt={attempt} />
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
