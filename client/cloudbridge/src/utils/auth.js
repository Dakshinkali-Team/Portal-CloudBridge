import { jwtDecode } from "jwt-decode";

export const AUTH_TOKEN_KEY = "token";
export const AUTH_ROLE_KEY = "role";
export const AUTH_CHANGE_EVENT = "cloudbridge-auth-change";

export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

const canUseBrowserStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const normalizeRole = (role) =>
  typeof role === "string" && role.trim()
    ? role.trim().toUpperCase()
    : null;

export const decodeRoleFromToken = (token) => {
  if (!token) return null;

  try {
    return normalizeRole(jwtDecode(token)?.role);
  } catch {
    try {
      const payload = JSON.parse(window.atob(token.split(".")[1] ?? ""));
      return normalizeRole(payload?.role);
    } catch {
      return null;
    }
  }
};

const emitAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};

export const getStoredToken = () =>
  canUseBrowserStorage() ? window.localStorage.getItem(AUTH_TOKEN_KEY) : null;

export const getStoredRole = () => {
  if (!canUseBrowserStorage()) return null;

  const savedRole = normalizeRole(window.localStorage.getItem(AUTH_ROLE_KEY));
  if (savedRole) return savedRole;

  const tokenRole = decodeRoleFromToken(getStoredToken());
  if (tokenRole) {
    window.localStorage.setItem(AUTH_ROLE_KEY, tokenRole);
  }

  return tokenRole;
};

export const getAuthSession = () => {
  const token = getStoredToken();
  const role = getStoredRole();

  return {
    token,
    role,
    isAuthenticated: Boolean(token && role),
  };
};

export const persistAuthSession = ({ token, role }) => {
  if (!canUseBrowserStorage() || !token) {
    clearAuthSession();
    return getAuthSession();
  }

  const normalizedRole = normalizeRole(role) || decodeRoleFromToken(token);

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);

  if (normalizedRole) {
    window.localStorage.setItem(AUTH_ROLE_KEY, normalizedRole);
  } else {
    window.localStorage.removeItem(AUTH_ROLE_KEY);
  }

  emitAuthChange();

  return {
    token,
    role: normalizedRole,
    isAuthenticated: Boolean(token && normalizedRole),
  };
};

export const clearAuthSession = () => {
  if (!canUseBrowserStorage()) return;

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_ROLE_KEY);
  emitAuthChange();
};

export const getDefaultRouteForRole = (role) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === ROLES.ADMIN) return "/admin-dashboard";
  if (normalizedRole === ROLES.CUSTOMER) return "/dashboard";
  return "/";
};

export const isRoleAllowed = (role, allowedRoles = []) => {
  if (!allowedRoles.length) return true;

  const normalizedRole = normalizeRole(role);

  return allowedRoles
    .map((allowedRole) => normalizeRole(allowedRole))
    .includes(normalizedRole);
};
