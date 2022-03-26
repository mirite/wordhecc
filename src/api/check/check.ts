import { Handler } from '@netlify/functions';
import { checkWordOfTheDay } from '../../tools';

export const handler: Handler = async (event, context) => {
	try {
		if (!event.body) return { statusCode: 400 };
		const { attempt } = JSON.parse(event.body);
		if (!attempt || attempt.length <= 10) return { statusCode: 400 };
		return {
			statusCode: 200,
			body: JSON.stringify({
				result: checkWordOfTheDay(attempt),
			}),
		};
	} catch (e) {
		return { statusCode: 500 };
	}
};
