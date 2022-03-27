import React from 'react';
import AttemptLetter from './AttemptLetter';
import * as styles from '../styles/Attempt.module.css';
import { IAttempt, ILetter } from '../types';

interface IProps {
	attempt: IAttempt;
}
const Attempt = (props: IProps) => {
	return (
		<div className={styles.attempt}>
			{props.attempt.map((letter, i) => (
				<AttemptLetter key={i} letter={letter} />
			))}
		</div>
	);
};

export default Attempt;