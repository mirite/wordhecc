import React from 'react';
import Attempt from '../Attempt/Attempt';
import * as styles from './CurrentAttempt.module.css';
import { ELetterState, IAttempt } from '../../../types';

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
