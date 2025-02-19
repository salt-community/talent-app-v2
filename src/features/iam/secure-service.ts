import { auth } from "@clerk/nextjs/server";
import { iamService } from ".";

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
>(featureName: TFeatureName, service: TService): TService {
  const serviceMethodNames = Object.keys(service) as Array<
    keyof TService extends string ? keyof TService : never
  >;

  const securedService = serviceMethodNames.reduce((acc, serviceMethodName) => {
    const permission = `${featureName}.${serviceMethodName}` as const;

    async function securedServiceMethod(args: unknown) {
      const { userId } = await auth();
      const roles: string[] = ["guest"];
      if (userId) {
        const identityRoles = await iamService.getAllRolesByUserId(userId);
        for (const identityRole of identityRoles) {
          roles.push(identityRole.role);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await iamService.checkAccess(permission as any, roles);
      return service[serviceMethodName](args);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[serviceMethodName] = securedServiceMethod as any;

    return acc;
  }, {} as TService);

  return securedService;
}
