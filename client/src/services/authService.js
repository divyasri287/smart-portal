/**
 * AuthService - Placeholder API service for authentication logic
 */

export const authService = {
  login: async (credentials) => {
    console.log('[Placeholder API] authService.login called with:', credentials);
    return { success: true, token: 'mock-jwt-token-2026', user: { name: 'M. Karthik', role: credentials.role || 'farmer' } };
  },
  logout: async () => {
    console.log('[Placeholder API] authService.logout called');
    return { success: true };
  },
  getCurrentUser: async () => {
    console.log('[Placeholder API] authService.getCurrentUser called');
    return { id: 'USR-1001', name: 'M. Karthik', role: 'farmer' };
  },
};
