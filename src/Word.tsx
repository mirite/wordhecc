import React from 'react';
import Attempt from './Attempt';
import { IAttempt } from './types';

interface IProps {
	word: string;
	attempt: IAttempt;
}
const Word = (props: IProps) => {
	return (
		<div>
			<Attempt attempt={props.attempt} />
			{props.word}
		</div>
	);
};

export default Word;
