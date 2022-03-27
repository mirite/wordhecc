import React from 'react';
import * as styles from '../styles/Keyboard.module.css';
import EnterButton from './EnterButton';
import Spacer from './Spacer';
import Key from './Key';
import BackspaceButton from './BackspaceButton';
import { ILetter } from '../types';

interface IProps {
	row: ILetter[];
	rIndex: number;
	onKeyClick: (letter: ILetter) => void;
	onBackClick: () => void;
	onEnterClick: () => void;
	isEnterEnabled: boolean;
	isBackspaceEnabled: boolean;
}

const KeyboardRow = (props: IProps) => {
	const {
		row,
		rIndex,
		onKeyClick,
		onBackClick,
		onEnterClick,
		isBackspaceEnabled,
		isEnterEnabled,
	} = props;

	const rowTemplates = [
		'repeat(10, 1fr)',
		'0.5fr repeat(9, 1fr) 0.5fr',
		'1.5fr repeat(7, 1fr) 1.5fr',
	];

	const rowStyles = { gridTemplateColumns: rowTemplates[rIndex] };

	return (
		<div key={rIndex} className={styles.row} style={rowStyles}>
			{rIndex === 2 ? (
				<EnterButton onClick={onEnterClick} enabled={isEnterEnabled} />
			) : (
				''
			)}
			{rIndex === 1 ? <Spacer /> : ''}
			{row.map((letter) => (
				<Key
					key={letter.character}
					letter={letter}
					onClick={() => onKeyClick(letter)}
				/>
			))}
			{rIndex === 1 ? <Spacer /> : ''}
			{rIndex === 2 ? (
				<BackspaceButton
					onClick={onBackClick}
					enabled={isBackspaceEnabled}
				/>
			) : (
				''
			)}
		</div>
	);
};

export default KeyboardRow;
