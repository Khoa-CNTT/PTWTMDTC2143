import { RoleEnum } from '@prisma/client';

export const RolePolicy = {
  '/brands': {
    POST: [RoleEnum.ADMIN],
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },
  '/category': {
    POST: [RoleEnum.ADMIN],
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },
  '/cart': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    PATCH: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/cart/item/:id': {
    DELETE: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/cart/clear': {
    DELETE: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/discounts': {
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/discounts/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },
  '/inventory': {
    GET: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/inventory/check-stock': {
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/inventory/variant/:variantId': {
    GET: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/order': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN], // VD: tạo order
  },
  '/order/admin/all': {
    GET: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/order/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/order/:id/status': {
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/order/prepare-paypal': {
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/order/confirm-paypal': {
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/product/create': {
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/product/:productId': {
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/product/:productId/variants': {
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/product/:variantId/variants': {
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/returns/order/:orderId': {
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/returns': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/returns/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/returns/:id/status': {
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/reviews': {
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    GET: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/reviews/user/:name/reviews': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/reviews/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/reviews/:id/hide': {
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/voucher': {
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/voucher/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },
  '/voucher/:id/toggle-status': {
    PATCH: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/warehouses': {
    POST: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/warehouses/:id': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
    DELETE: [RoleEnum.ADMIN],
  },
  '/warehouses/:id/status': {
    PUT: [RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/wishlist': {
    GET: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
    POST: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  '/wishlist/:variantId': {
    DELETE: [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN],
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
  { path: '/query', method: 'POST' },

  // Brands
  { path: '/brands', method: 'GET' },
  { path: '/brands/:id', method: 'GET' },
  { path: '/brands/name/:name', method: 'GET' },

  // Category
  { path: '/category', method: 'GET' },
  { path: '/category/:id', method: 'GET' },
  { path: '/category/subcategories/:id', method: 'GET' },
  { path: '/category/parent/:id', method: 'GET' },

  // Products
  { path: '/product', method: 'GET' },
  { path: '/product/by-category', method: 'GET' },
  { path: '/product/search-by-name', method: 'GET' },

  // Product Variants
  { path: '/product/variants/:variantId', method: 'GET' },
  { path: '/product/variants', method: 'GET' },

  { path: '/reviews/product/:productId', method: 'GET' },
  { path: '/voucher', method: 'GET' },
  { path: '/voucher/:id', method: 'GET' },

  { path: '/warehouses', method: 'GET' },
  { path: '/warehouses/:id', method: 'GET' },
  { path: '/warehouses/name/:name', method: 'GET' },

  { path: '/flashsale', method: 'POST' },
  { path: '/flashsale', method: 'GET' },
];
