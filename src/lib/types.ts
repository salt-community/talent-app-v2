import { ForbiddenError, NotFoundError, UnauthorizedError } from "./error/errors";

export type CustomError =
  | Error
  | UnauthorizedError
  | ForbiddenError
  | NotFoundError;
  