import React from 'react';
import * as styles from './Quotes.module.css';

const Quotes = () => {
	const quotes = [
		{
			text: "What's wrong with you?",
			source: 'My Mom',
		},
		{
			text: "It's already difficult enough",
			source: 'Also My Mom',
		},
		{
			text: "I'm in misery",
			source: 'My Brother',
		},
		{
			text: "It's the hardest word game I've ever played",
			source: 'My Coworker',
		},
		{
			text: 'You misunderstood what I was saying…',
			source: 'My Other Coworker',
		},
		{
			text: 'This is evil',
			source: 'My Other Other Coworker',
		},
	];
	return (
		<div className={styles.quotes}>
			{quotes.map((quote, i) => {
				return (
					<div key={i} className={'text-center ' + styles.quote}>
						<blockquote className="blockquote">
							<em>&quot;{quote.text}&quot;</em>
						</blockquote>
						- {quote.source}
					</div>
				);
			})}
		</div>
	);
};

export default Quotes;
