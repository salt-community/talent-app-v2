// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Service = { [key: string]: (args: any) => Promise<any> };

export type PermissionsSchema<
  TFeatureName extends string,
  TService extends Service,
> = {
  [K in keyof TService]: `${TFeatureName}.${K extends string ? K : never}`;
};

export function secureService<
  TFeatureName extends string,
  TService extends Service,
>(
  featureName: TFeatureName,
  service: TService
): PermissionsSchema<TFeatureName, TService> {
  const serviceMethodNames = Object.keys(service) as Array<
    keyof TService extends string ? keyof TService : never
  >;

  return serviceMethodNames.reduce(
    (acc, serviceMethodName) => {
      acc[serviceMethodName] = `${featureName}.${serviceMethodName}`;
      return acc;
    },
    {} as PermissionsSchema<TFeatureName, TService>
  );
}
