import React from 'react';
import styles from './AttemptLetter.module.css';
import { ILetter, stateClasses } from '../../../types';

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
