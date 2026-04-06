export const APP_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MAIN_ADMIN: 'MAIN_ADMIN',
  ADMIN_USER: 'ADMIN_USER',
} as const;

export type AppRole = (typeof APP_ROLES)[keyof typeof APP_ROLES];