import React from 'react';
import * as styles from '../styles/AttemptLetter.module.css';
import { ILetter } from '../types';
import { stateClasses } from './Key';
interface IProps {
	letter: ILetter;
}
const AttemptLetter = (props: IProps) => {
	const className = stateClasses[props.letter.state];
	return (
		<div className={styles.attemptLetter + ' ' + className}>
			{props.letter.character}
		</div>
	);
};

export default AttemptLetter;
