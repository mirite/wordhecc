import type { Handler } from "@netlify/functions";

import { getWord } from "../../helpers/dictionary/dictionaryLoader";
import { logSuccess } from "../../helpers/logging/logging";
import { checkWord, checkWordOfTheDay } from "../../helpers/wordChecker";
import type { ICheckWordResponse } from "../../types";

export const handler: Handler = async (event) => {
  try {
    if (!event.body) return { statusCode: 400 };
    const { attempt, count, previousAttempts } = JSON.parse(event.body);
    if (!attempt || attempt.length > 9 || !count || !previousAttempts?.join) return { statusCode: 400 };
    const complete = checkWord(attempt, getWord());
    if (complete) {
      logSuccess(Number.parseInt(count), previousAttempts);
    }
    const response: ICheckWordResponse = {
      complete,
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
