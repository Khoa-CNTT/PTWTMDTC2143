import { RoleEnum } from '@prisma/client';

export const RolePolicy = {
  '/brands': {
    POST: [RoleEnum.ADMIN],
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/brands/:id': {
    PUT: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    DELETE: [RoleEnum.ADMIN],
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/brands/name/:name': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },

  // Categories
  '/category': {
    POST: [RoleEnum.ADMIN],
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/category/:id': {
    PUT: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    DELETE: [RoleEnum.ADMIN],
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/category/subcategories/:id': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/category/parent/:id': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },

  // Products
  '/product/create': {
    POST: [RoleEnum.ADMIN],
  },
  '/product/:productId': {
    PUT: [RoleEnum.ADMIN, RoleEnum.MANAGER],
  },
  '/product/:productId/variants': {
    POST: [RoleEnum.ADMIN],
  },
  '/product/:variantId/variants': {
    PUT: [RoleEnum.ADMIN, RoleEnum.MANAGER],
  },
  '/product/by-category': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/product/variants/:variantId': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/product/search': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },

  // Inventory
  '/inventory': {
    POST: [RoleEnum.ADMIN],
    PUT: [RoleEnum.ADMIN],
  },
  '/inventory/check-stock': {
    POST: [RoleEnum.ADMIN, RoleEnum.USER],
  },
  '/inventory/variant/:variantId': {
    GET: [RoleEnum.ADMIN, RoleEnum.USER],
  },

  // Reviews
  '/reviews': {
    POST: [RoleEnum.USER, RoleEnum.ADMIN],
  },

  // Carts
  '/cart': {
    GET: [RoleEnum.USER, RoleEnum.ADMIN],
    POST: [RoleEnum.USER, RoleEnum.ADMIN],
    PATCH: [RoleEnum.USER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/cart/item/:id': {
    DELETE: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/cart/selected-items': {
    GET: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/cart/update-quantity': {
    PATCH: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/cart/select-item': {
    PATCH: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/cart/clear': {
    DELETE: [RoleEnum.USER, RoleEnum.ADMIN],
  },

  // orders
  '/order': {
    POST: [RoleEnum.USER, RoleEnum.ADMIN],
    GET: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/order/:id': {
    GET: [RoleEnum.USER, RoleEnum.ADMIN],
  },
  '/order/:id/status': {
    PATCH: [RoleEnum.ADMIN, RoleEnum.MANAGER],
  },

  // Discount
  '/discounts': {
    GET: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    POST: [RoleEnum.ADMIN],
  },
  '/discounts/:id': {
    GET: [RoleEnum.ADMIN, RoleEnum.MANAGER],
    PATCH: [RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },

  //Voucher
  '/voucher': {
    GET: ['ADMIN', 'MANAGER'],
    POST: ['ADMIN'],
  },
  '/voucher/:id': {
    GET: ['ADMIN', 'MANAGER'],
    PATCH: ['ADMIN'],
    DELETE: ['ADMIN'],
  },
  '/voucher/:id/toggle-status': {
    PATCH: ['ADMIN'],
  },

  // Warehouse
  '/warehouses': {
    GET: ['ADMIN', 'MANAGER'],
    POST: ['ADMIN'],
  },
  '/warehouses/:id': {
    GET: ['ADMIN', 'MANAGER'],
    PUT: ['ADMIN'],
    DELETE: ['ADMIN'],
  },
  '/warehouses/:id/status': {
    PUT: ['ADMIN'],
  },

  //wishlist
  '/wishlist': {
    GET: ['ADMIN', 'USER', 'MANAGER'],
    POST: ['USER', 'MANAGER'],
  },
  '/wishlist/:variantId': {
    DELETE: ['USER'],
  },
};

export const PublicRoutes = [
  { path: '/public-info', method: 'GET' },
  { path: '/auth/login', method: 'POST' },
  { path: '/auth/register', method: 'POST' },
  { path: '/reviews/product/:productId', method: 'GET' },
  { path: '/reviews/:id', method: 'GET' },
  { path: '/email/send-otp', method: 'POST' },
  { path: '/email/verify-otp', method: 'POST' },
  { path: '/email/resend-otp', method: 'POST' },
];
