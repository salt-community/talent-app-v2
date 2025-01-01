import path from "path";
import { appendFileSync } from "fs";
import { formatDate } from "./format-date";
import { getLogMessage } from "./get-log-message";
import { CustomError } from "@/lib";

export const writeToLogFile = (error: CustomError, errorText: string) => {
  const date = new Date();

  const { todaysDateStripped } = formatDate(date);

  const fileName = `error-log-${todaysDateStripped}.txt`;

  const filePath = path.join(process.cwd(), "src/logs", fileName);

  const logMessage = getLogMessage(error, errorText, date);

  appendFileSync(filePath, logMessage);
};
