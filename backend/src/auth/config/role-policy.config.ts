import { RoleEnum } from '@prisma/client';

export const RolePolicy = {
  '/brands': {
    POST: [RoleEnum.ADMIN],
    GET: [RoleEnum.USER],
  },
  '/brands/:id': {
    PUT: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    DELETE: [RoleEnum.ADMIN],
  },
};

export const PublicRoutes = [
  { path: '/public-info', method: 'GET' },
  { path: '/auth/login', method: 'POST' },
  { path: '/auth/register', method: 'POST' },
  { path: '/user', method: 'POST' },
];
