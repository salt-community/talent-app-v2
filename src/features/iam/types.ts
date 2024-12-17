import { createService } from "./service";

type DevelopersService = ReturnType<typeof createService>;

export type checkAccess = DevelopersService["checkAccess"];
