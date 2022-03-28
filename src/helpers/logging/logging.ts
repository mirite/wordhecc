/* eslint-disable no-console */
import mongoose, { model, Schema, Model, Document } from 'mongoose';
require('dotenv').config();

export interface ILogEntry extends Document {
	added?: Date;
	data: String;
}

export const ILogEntrySchema = new Schema({
	added: {
		type: Date,
		default: Date.now,
	},
	data: String,
});
const LogEntryModel: Model<ILogEntry> = model('LogEntry', ILogEntrySchema);

function connectToMongo(): void {
	const connectionString = process.env.CONNECTION_STRING as string;
	if (!connectionString)
		throw new Error('Connection string not provided in environment');
	mongoose.connect(connectionString, {
		retryWrites: false,
	});
}

export function logSuccess(count: number, attempts: string[]) {
	connectToMongo();
	const entry = {
		data: 'Solved in ' + count + '\n' + attempts.join('\n'),
	};

	const logEntryObject = new LogEntryModel(entry);

	logEntryObject
		.save()
		.then(() => console.log('Saved record'))
		.catch((e) => console.log('Failed to save entry ' + e));
}
