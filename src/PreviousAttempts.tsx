import React from 'react';
import Attempt from './Attempt';
import { IAttempt } from './types';
import * as styles from './styles/PreviousAttempts.module.css';
interface IProps {
	previousAttempts: IAttempt[];
}
const PreviousAttempts = (props: IProps) => {
	const { previousAttempts } = props;
	return (
		<div className={styles.previousAttempts}>
			{previousAttempts.map((previousAttempt, i) => (
				<Attempt key={i} attempt={previousAttempt} />
			))}
		</div>
	);
};

export default PreviousAttempts;
