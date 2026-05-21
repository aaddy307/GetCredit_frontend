export const ROLE_LABELS = {
  admin: 'Admin'
};

export const PERMISSIONS = {
  admin: {
    leads: ['read', 'create', 'update', 'delete', 'export', 'import'],
    callbacks: ['read', 'create', 'update', 'delete'],
    blog: ['read', 'create', 'update', 'delete'],
    analytics: ['read'],
    users: ['read', 'create', 'update', 'delete'],
    email: ['send']
  }
};

export const canAccess = (role, resource) => {
  return !!PERMISSIONS[role || 'admin']?.[resource];
};
