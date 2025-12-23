// Role constants
export const ROLES = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  DISTRIBUTOR: 'DISTRIBUTOR',
  INVESTOR: 'INVESTOR',
} as const;

export const EMPLOYEE_ROLES = {
  MANAGER: 'MANAGER',
  ANALYST: 'ANALYST',
  SUPPORT: 'SUPPORT',
  OPERATIONS: 'OPERATIONS',
} as const;

// Product types
export const PRODUCT_TYPES = {
  PMS: 'PMS', // Portfolio Management Service
  AIF: 'AIF', // Alternative Investment Fund
  SIF: 'SIF', // Sector Investment Fund
  MF: 'MF',   // Mutual Fund
  GIFT: 'GIFT', // Gold Investment Fund Trading
} as const;

// Risk levels
export const RISK_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH',
} as const;

// Transaction types
export const TRANSACTION_TYPES = {
  INVESTMENT: 'INVESTMENT',
  REDEMPTION: 'REDEMPTION',
  DIVIDEND: 'DIVIDEND',
  TRANSFER: 'TRANSFER',
  WITHDRAWAL: 'WITHDRAWAL',
} as const;

// Transaction statuses
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  PROCESSING: 'PROCESSING',
} as const;

// Investment statuses
export const INVESTMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  REDEEMED: 'REDEEMED',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  MATURED: 'MATURED',
} as const;

// Product status
export const PRODUCT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CLOSED: 'CLOSED',
  SUSPENDED: 'SUSPENDED',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to access this resource',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  SERVER_ERROR: 'Server error. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SESSION_EXPIRED: 'Your session has expired. Please login again',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  INVESTMENT_CREATED: 'Investment created successfully',
  INVESTMENT_REDEEMED: 'Investment redeemed successfully',
  TRANSACTION_COMPLETED: 'Transaction completed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE_REGEX: /^[0-9]{10}$/,
  AMOUNT_REGEX: /^\d+(\.\d{1,2})?$/,
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  LIMITS: [5, 10, 25, 50, 100],
} as const;

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MMM DD, YYYY',
  LONG: 'MMMM DD, YYYY',
  FULL: 'dddd, MMMM DD, YYYY',
  TIME: 'HH:mm:ss',
  DATE_TIME: 'MMM DD, YYYY HH:mm',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebarOpen',
  PREFERENCES: 'userPreferences',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: '/auth',
  AUTH_SIGNIN: '/auth/signin',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  AUTH_REFRESH: '/auth/refresh',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:id',
  PRODUCTS_BY_TYPE: '/products/type/:type',
  PRODUCTS_SEARCH: '/products/search',

  // Portfolio
  PORTFOLIO: '/portfolio/:userId',
  PORTFOLIO_INVESTMENTS: '/portfolio/:userId/investments',
  PORTFOLIO_SUMMARY: '/portfolio/:userId/summary',
  INVESTMENTS: '/investments',
  INVESTMENT_BY_ID: '/investments/:id',
  INVESTMENT_REDEEM: '/investments/:id/redeem',

  // Transactions
  TRANSACTIONS: '/transactions',
  TRANSACTIONS_BY_USER: '/transactions/user/:userId',
  TRANSACTION_BY_ID: '/transactions/:id',
  TRANSACTIONS_BY_STATUS: '/transactions/status',
  TRANSACTIONS_STATISTICS: '/transactions/user/:userId/statistics',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Notification durations (in ms)
export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
  PERMANENT: 0,
} as const;

// Feature permissions
export const PERMISSIONS = {
  // Product permissions
  VIEW_PRODUCTS: 'view:products',
  CREATE_PRODUCT: 'create:product',
  EDIT_PRODUCT: 'edit:product',
  DELETE_PRODUCT: 'delete:product',

  // Portfolio permissions
  VIEW_PORTFOLIO: 'view:portfolio',
  MANAGE_PORTFOLIO: 'manage:portfolio',
  REDEEM_INVESTMENT: 'redeem:investment',

  // Transaction permissions
  VIEW_TRANSACTIONS: 'view:transactions',
  CREATE_TRANSACTION: 'create:transaction',
  APPROVE_TRANSACTION: 'approve:transaction',

  // User permissions
  VIEW_USERS: 'view:users',
  CREATE_USER: 'create:user',
  EDIT_USER: 'edit:user',
  DELETE_USER: 'delete:user',

  // Admin permissions
  VIEW_REPORTS: 'view:reports',
  MANAGE_PERMISSIONS: 'manage:permissions',
  SYSTEM_SETTINGS: 'system:settings',
} as const;

// Tab indices for accessibility
export const TAB_INDEX = {
  SKIP_TO_MAIN: 1,
  NAVIGATION: 2,
  CONTENT: 3,
} as const;
