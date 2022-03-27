import React from 'react';
import KeyboardRow from '../KeyboardRow/KeyboardRow';
import * as styles from './Keyboard.module.css';
import { IKeyboard, ILetter } from '../../../types';

interface IProps {
	keyboardState: IKeyboard;
	onKeyClick: (letter: ILetter) => void;
	onBackClick: () => void;
	onEnterClick: () => void;
	isEnterEnabled: boolean;
	isBackspaceEnabled: boolean;
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
				<KeyboardRow
					key={rIndex}
					row={row}
					rIndex={rIndex}
					isBackspaceEnabled={props.isBackspaceEnabled}
					isEnterEnabled={props.isEnterEnabled}
					onBackClick={() => props.onBackClick()}
					onEnterClick={() => props.onEnterClick()}
					onKeyClick={(e) => props.onKeyClick(e)}
				/>
			))}
		</div>
	);
};

export default Keyboard;
