import React from 'react';
import Key from './Key';
import * as styles from './styles/Keyboard.module.css';
import { IKeyboard, ILetter } from './types';
import BackspaceButton from './BackspaceButton';
import EnterButton from './EnterButton';

interface IProps {
	keyboardState: IKeyboard;
	onKeyClick: (letter: ILetter) => void;
	onBackClick: () => void;
	onEnterClick: () => void;
}

const Keyboard = (props: IProps) => {
	const { keyboardState } = props;

	function keyboardIntoRows(keyboard: IKeyboard): ILetter[][] {
		const output: ILetter[][] = [[]];
		let rowIndex = 0;
		for (const letter of keyboard) {
			if (letter.row !== rowIndex) {
				rowIndex++;
				output.push([]);
			}
			output[rowIndex].push(letter);
		}
		return output;
	}

	const letters = keyboardIntoRows(keyboardState);

	return (
		<div className={styles.keyboard}>
			{letters.map((row, rIndex) => (
				<div key={rIndex} className={styles.row}>
					{rIndex === letters.length - 1 ? <EnterButton /> : ''}
					{row.map((letter) => (
						<Key
							key={letter.character}
							letter={letter}
							onClick={() => props.onKeyClick(letter)}
						/>
					))}
					{rIndex === letters.length - 1 ? <BackspaceButton /> : ''}
				</div>
			))}
		</div>
	);
};

export default Keyboard;
