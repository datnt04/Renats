// Mapping role → dashboard route (dùng chung toàn app)
export const ROLE_HOME = {
  ADMIN:   '/admin/dashboard',
  DEPOT:   '/kho/dashboard',
  FACTORY: '/recycle/dashboard',
  DRIVER:  '/transport/market',
  SELLER:  '/seller/dashboard',
};

// Các route mỗi role được phép vào (prefix-based)
export const ROLE_ALLOWED_PREFIXES = {
  ADMIN:   ['/', '/admin', '/gioi-thieu'],
  DEPOT:   ['/', '/kho', '/hoa-don', '/gioi-thieu'],
  FACTORY: ['/', '/recycle', '/nha-may', '/hoa-don', '/gioi-thieu'],
  DRIVER:  ['/', '/transport', '/van-chuyen', '/gioi-thieu'],
  SELLER:  ['/', '/seller', '/hoa-don', '/gioi-thieu'],
};
