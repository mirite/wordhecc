import { Handler } from '@netlify/functions';
import { getWord } from '../../helpers/dictionary/dictionaryLoader';

export const handler: Handler = async (event, context) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			word: getWord(),
		}),
	};
};
