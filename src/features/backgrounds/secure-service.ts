// import { BackgroundsService } from "./types";

export type PermissionsSchema<
  TNamespace extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TService extends { [key: string]: (args: any) => Promise<any> },
> = {
  [K in keyof TService]: `${TNamespace}.${K extends string ? K : never}`;
};

// type Test = PermissionsSchema<"backgrounds", BackgroundsService>;

// const securedBackgroundsService = secure(
//   backgroundsService,
//   backgroundsPermissions
// );
