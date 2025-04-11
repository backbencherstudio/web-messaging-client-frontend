const TWO_FACTOR_AUTH_STATUS = "user_2fa_status";

export const twoFactorStorage = {
  getStatus() {
    if (typeof window === "undefined") return false;
    const status = localStorage.getItem(TWO_FACTOR_AUTH_STATUS);
    return status === "true";
  },

  setStatus(enabled) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TWO_FACTOR_AUTH_STATUS, enabled.toString());
  },

  clearStatus() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TWO_FACTOR_AUTH_STATUS);
  }
};