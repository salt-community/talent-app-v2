import { iamService } from "../iam";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Service = { [key: string]: (args: any) => Promise<any> };

export function secureService<
  TFeatureName extends string,
  TService extends Service,
>(featureName: TFeatureName, service: TService): TService {
  const serviceMethodNames = Object.keys(service) as Array<
    keyof TService extends string ? keyof TService : never
  >;

  const securedService = serviceMethodNames.reduce((acc, serviceMethodName) => {
    const permission = `${featureName}.${serviceMethodName}` as const;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function securedServiceMethod(args: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await iamService.checkAccess(permission as any);

      return service[serviceMethodName](args);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[serviceMethodName] = securedServiceMethod as any;

    return acc;
  }, {} as TService);

  return securedService;
}
