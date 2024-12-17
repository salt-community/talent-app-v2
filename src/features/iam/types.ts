import { createService } from "./service";

type iamService = ReturnType<typeof createService>;

export type CheckAccess = iamService["checkAccess"];
