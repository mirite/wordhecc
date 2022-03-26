import React from 'react';
import Attempt from './Attempt';
import * as styles from './styles/CurrentAttempt.module.css';
import { ELetterState, IAttempt } from './types';

interface IProps {
	attempt: IAttempt;
}
const CurrentAttempt = (props: IProps) => {
	return (
		<div className={styles.word}>
			<Attempt
				attempt={
					props.attempt.length
						? props.attempt
						: [{ character: '', state: ELetterState.unused }]
				}
			/>
		</div>
	);
};

export default CurrentAttempt;
