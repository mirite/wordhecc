/* eslint-disable no-console */

export interface ILogEntry extends Document {
	added?: Date;
	data: String;
}



export function logSuccess(count: number, attempts: string[]) {

	const entry = {
		data: 'Solved in ' + count + '\n' + attempts.join('\n'),
	};

	console.log(entry);
}
