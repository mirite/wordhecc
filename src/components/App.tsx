import React from 'react';
import Keyboard from './keyboard/Keyboard/Keyboard';
import CurrentAttempt from './attempts/CurrentAttempt/CurrentAttempt';
import PreviousAttempts from './attempts/PreviousAttempts/PreviousAttempts';
import { stringFromAttempt } from '../helpers/wordChecker';
import {
	createStartingKeyboard,
	isKeyOnKeyboard,
} from '../helpers/create-keyboard.';
import * as styles from './App.module.css';
import {
	ELetterState,
	IAttempt,
	ICheckWordResponse,
	IKeyboard,
	ILetter,
} from '../types';
import { isInDictionary } from '../helpers/dictionary/dictionaryLoader';

interface IState {
	keyboard: IKeyboard;
	attempt: IAttempt;
	previousAttempts: IAttempt[];
	solved: boolean;
	stateCreated: number;
}

interface IProps {}

class App extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		const stateFromStorageString =
			window?.localStorage?.getItem('wordhecc');
		const currentUTCDate = new Date().getUTCDate();
		let stateToSet: IState = {
			solved: false,
			keyboard: createStartingKeyboard(),
			attempt: [],
			previousAttempts: [],
			stateCreated: currentUTCDate,
		};

		if (stateFromStorageString) {
			const stateFromStorage = JSON.parse(
				stateFromStorageString
			) as IState;
			if (stateFromStorage?.stateCreated === currentUTCDate) {
				stateToSet = stateFromStorage;
			}
		}
		this.state = stateToSet;
	}

	updateState(newState: Pick<IState, never>) {
		this.setState(newState, () => this.saveStateToStorage());
	}

	saveStateToStorage() {
		const stateToSave: IState = { ...this.state };

		if (window.localStorage) {
			window.localStorage.setItem(
				'wordhecc',
				JSON.stringify(stateToSave)
			);
		}
	}

	setSolved() {
		this.updateState({ solved: true });
	}

	setAttempt(attempt: IAttempt) {
		this.updateState({ attempt });
	}

	updateKeys(response: ICheckWordResponse) {
		const { keyboard } = this.state;
		const keys = [...keyboard];
		const { result } = response;

		const updateKeyState = (key: ILetter) => {
			const match = result.find(
				(char) => char.character === key.character
			);
			if (!match) return;
			if (match.state > key.state) {
				key.state = match.state;
			}
		};

		for (const key of keys) {
			updateKeyState(key);
		}

		this.updateState({ keyboard: keys });
	}

	addLetterToAttempt(letter: ILetter) {
		const { attempt } = this.state;
		const items = [...attempt];
		if (items.length >= 8) return;
		items.push({ character: letter.character, state: ELetterState.unused });
		this.setAttempt(items);
	}

	removeLetterFromAttempt() {
		const { attempt } = this.state;
		const items = [...attempt];
		items.pop();
		this.setAttempt(items);
	}

	async submitAttempt() {
		const { attempt, previousAttempts } = this.state;
		const attemptAsString = stringFromAttempt(attempt);
		const previousAttemptsStrings = previousAttempts.length
			? previousAttempts.map((a) => stringFromAttempt(a))
			: [];
		const result = await fetch('/.netlify/functions/check', {
			method: 'POST',
			body: JSON.stringify({
				attempt: attemptAsString,
				count: previousAttemptsStrings.length + 1,
				previousAttempts: previousAttemptsStrings,
			}),
		});
		const response = await result.json();
		this.updateAttempts(response as ICheckWordResponse);
		this.updateKeys(response as ICheckWordResponse);
	}

	updateAttempts(response: ICheckWordResponse) {
		if (response.complete) this.setSolved();
		const { previousAttempts } = this.state;
		const oldPreviousAttempts = [...previousAttempts];
		oldPreviousAttempts.push(response.result);
		this.updateState({
			attempt: [],
			previousAttempts: oldPreviousAttempts,
		});
	}

	handleKeypress(e: KeyboardEvent) {
		if (this.state.solved) return;
		if (e.key === 'Backspace') {
			this.removeLetterFromAttempt();
			return;
		}

		if (
			e.key === 'Enter' &&
			isInDictionary(stringFromAttempt(this.state.attempt))
		) {
			this.submitAttempt();
			return;
		}
		if (!isKeyOnKeyboard(e.key)) return;
		this.addLetterToAttempt({
			character: e.key.toUpperCase(),
			state: ELetterState.unused,
			row: 0,
		});
	}

	componentDidMount() {
		window.addEventListener('keyup', (e) => this.handleKeypress(e));
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleKeypress);
	}

	getSolvedText() {
		const { previousAttempts } = this.state;
		return (
			<div>
				<h1 className={styles.congratulations}>You did it!</h1>
				<p className="text-center">
					And it only took you {previousAttempts.length} tries!
				</p>
			</div>
		);
	}

	getKeyboard() {
		const { attempt, keyboard } = this.state;
		return (
			<Keyboard
				keyboardState={keyboard}
				onKeyClick={(letter: ILetter) =>
					this.addLetterToAttempt(letter)
				}
				onBackClick={() => this.removeLetterFromAttempt()}
				onEnterClick={() => this.submitAttempt()}
				isEnterEnabled={isInDictionary(stringFromAttempt(attempt))}
				isBackspaceEnabled={attempt.length > 0}
			/>
		);
	}

	render() {
		const { solved, attempt, previousAttempts } = this.state;

		return (
			<div className={styles.container}>
				<PreviousAttempts previousAttempts={previousAttempts} />
				{solved ? (
					this.getSolvedText()
				) : (
					<div>
						<CurrentAttempt attempt={attempt} />{' '}
						{this.getKeyboard()}
					</div>
				)}
			</div>
		);
	}
}

export default App;
