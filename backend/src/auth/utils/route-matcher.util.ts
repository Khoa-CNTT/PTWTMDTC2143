import { match } from 'path-to-regexp';
import { PublicRoutes, RolePolicy } from '../config/role-policy.config';

export function matchRoutePath(path: string, method: string): string[] | null {
  for (const pattern in RolePolicy) {
    const matcher = match(pattern, { decode: decodeURIComponent });
    const matched = matcher(path);
    if (matched) {
      const roles = RolePolicy[pattern][method];
      return roles ?? null;
    }
  }
  return null;
}

export function isPublicRoute(path: string, method: string): boolean {
  for (const route of PublicRoutes) {
    const matcher = match(route.path, { decode: decodeURIComponent });
    if (route.method === method && matcher(path)) {
      return true;
    }
  }
  return false;
}
