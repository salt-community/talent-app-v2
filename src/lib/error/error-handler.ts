import { UnauthorizedError, ForbiddenError, NotFoundError } from "@/lib";

export const errorHandler = (error: unknown) => {
  let errorText =
    `Title: Internal server error\n` +
    `Status code: 500\n` +
    `Message: Something went wrong`;
  if (
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError ||
    error instanceof NotFoundError
  ) {
    if (error instanceof UnauthorizedError) {
      errorText =
        `Title: ${error.title}\n` +
        `Status code: ${error.statusCode}\n` +
        `Message: ${error.message}. You're not authorized to view this page. Please contact admin if you believe this is an error.`;
    } else {
      errorText =
        `Title: ${error.title}\n` +
        `Status code: ${error.statusCode}\n` +
        `Message: ${error.message}.`;
    }
  } else if (error instanceof Error) {
    errorText =
      `Title: Internal server error\n` +
      `Status code: 500\n` +
      `Message: ${error.message}`;
  } else if (typeof error === "string" || typeof error === "number") {
    error = new Error(error.toString());
  }

  throw new Error(errorText);
};
