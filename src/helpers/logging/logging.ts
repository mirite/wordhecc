import mongoose, { model, Schema, Model, Document } from 'mongoose';
require('dotenv').config();
connectToMongo();

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
	try {
		mongoose.connect(process.env.CONNECTION_STRING as string, {
			retryWrites: false,
		});
	} catch(e) {
		// eslint-disable-next-line no-console
		console.log('Connection failed ' + e);
	}

}

export function logSuccess(count: number, attempts: string[]) {
	const entry = {
		data: 'Solved in ' + count + '\n' + attempts.join('\n'),
	};

		const logEntryObject = new LogEntryModel(entry);
	// eslint-disable-next-line no-console
		logEntryObject.save().catch(e=>console.log('Failed to save entry ' + e));

}
