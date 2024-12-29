export class AppError extends Error {
  cause?: Error;
  constructor(message: string, cause?: Error) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    if (cause) {
      this.cause = cause;
    }
    this.name = this.constructor.name;
  }
  get statusCode() {
    if (this.name === "ForbiddenError") return 401;
    if (this.name === "UnauthorizedError") return 403;
    if (this.name === "NotFoundError") return 404;
    return 500;
  }

  get title() {
    if (this.name === "ForbiddenError") return "Forbidden error";
    if (this.name === "UnauthorizedError") return "Unauthorized error";
    if (this.name === "NotFoundError") return "Not found error";
    return "Internal server error";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
