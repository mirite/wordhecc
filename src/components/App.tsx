import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import CurrentAttempt from './CurrentAttempt';
import {
	ELetterState,
	IAttempt,
	ICheckWordResponse,
	IKeyboard,
	ILetter,
} from '../types';
import PreviousAttempts from './PreviousAttempts';
import { isInDictionary, stringFromAttempt } from '../helpers/tools';
import {
	createStartingKeyboard,
	isKeyOnKeyboard,
} from '../helpers/create-keyboard.';

const App = () => {
	const [solved, setSolved] = useState(false);

	const [keyboard, setKeyboardState] = useState<IKeyboard>(
		createStartingKeyboard()
	);
	const [attempt, setAttempt] = useState<IAttempt>([]);
	const [previousAttempts, setPreviousAttempts] = useState<IAttempt[]>([]);

	const updateKeys = (response: ICheckWordResponse) => {
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
	};

	const addLetterToAttempt = (letter: ILetter) => {
		const items = [...attempt];
		if (items.length >= 9) return;
		items.push(letter);
		setAttempt(items);
	};

	const removeLetterFromAttempt = () => {
		const items = [...attempt];
		items.pop();
		setAttempt(items);
	};

	const submitAttempt = () => {
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
	};

	const updateAttempts = (response: ICheckWordResponse) => {
		if (response.complete) setSolved(true);
		const oldPreviousAttempts = [...previousAttempts];
		oldPreviousAttempts.push(response.result);
		setPreviousAttempts(oldPreviousAttempts);
		setAttempt([]);
	};

	const handleKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Backspace') {
			removeLetterFromAttempt();
			return;
		}

		if (e.key === 'Enter' && isInDictionary(stringFromAttempt(attempt))) {
			submitAttempt();
			return;
		}
		if (!isKeyOnKeyboard(e.key)) return;
		addLetterToAttempt({
			character: e.key.toUpperCase(),
			state: ELetterState.unused,
		});
	};

	window.removeEventListener('keyup', handleKeypress);
	useEffect(() => window.addEventListener('keyup', handleKeypress), []);

	if (solved) {
		return <h1>You did it!</h1>;
	}

	return (
		<div className="container-sm">
			<PreviousAttempts previousAttempts={previousAttempts} />
			<CurrentAttempt attempt={attempt} />
			<Keyboard
				keyboardState={keyboard}
				onKeyClick={(letter: ILetter) => addLetterToAttempt(letter)}
				onBackClick={removeLetterFromAttempt}
				onEnterClick={submitAttempt}
				isEnterEnabled={isInDictionary(stringFromAttempt(attempt))}
				isBackspaceEnabled={attempt.length > 0}
			/>
		</div>
	);
};

export default App;
