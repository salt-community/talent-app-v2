import { formatDate } from "./format-date";
import { CustomError } from "../types";

const divider = `\n-------------------------------------------------------------------------------------\n`;

export const getLogMessage = (error: CustomError, message: string, date: Date) => {
  const { todaysDateFull } = formatDate(date);

  return `Date: ${todaysDateFull}\n${message}\nComplete stack: ${error.stack}\n${divider}` ;
};
