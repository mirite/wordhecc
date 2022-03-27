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
}

interface IProps {}

class App extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			solved: false,
			keyboard: createStartingKeyboard(),
			attempt: [],
			previousAttempts: [],
		};
	}

	setSolved() {
		this.setState({ solved: true });
	}

	setAttempt(attempt: IAttempt) {
		this.setState({ attempt });
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

		this.setState({ keyboard: keys });
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
		const { attempt } = this.state;
		const attemptAsString = stringFromAttempt(attempt);
		const result = await fetch('/.netlify/functions/check', {
			method: 'POST',
			body: JSON.stringify({ attempt: attemptAsString }),
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
		this.setState({ attempt: [], previousAttempts: oldPreviousAttempts });
	}

	handleKeypress(e: KeyboardEvent) {
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

	render() {
		const { solved, attempt, previousAttempts, keyboard } = this.state;
		if (solved) {
			return <h1 className={styles.congratulations}>You did it!</h1>;
		}

		return (
			<div className={styles.container}>
				<PreviousAttempts previousAttempts={previousAttempts} />
				<CurrentAttempt attempt={attempt} />
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
			</div>
		);
	}
}

export default App;
