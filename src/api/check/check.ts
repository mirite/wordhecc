import { Handler } from '@netlify/functions';
import { checkWord, checkWordOfTheDay } from '../../helpers/wordChecker';
import { getWord } from '../../helpers/dictionary/dictionaryLoader';
import { ICheckWordResponse } from '../../types';

export const handler: Handler = async (event, context) => {
	try {
		if (!event.body) return { statusCode: 400 };
		const { attempt } = JSON.parse(event.body);
		if (!attempt || attempt.length > 9) return { statusCode: 400 };
		const response: ICheckWordResponse = {
			complete: checkWord(attempt, getWord()),
			result: checkWordOfTheDay(attempt),
		};
		return {
			statusCode: 200,
			body: JSON.stringify(response),
		};
	} catch (e) {
		return { statusCode: 500 };
	}
};
