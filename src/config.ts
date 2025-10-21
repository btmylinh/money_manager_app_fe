export const BASE_URL = "http://10.0.2.2:5000/api"; // Android emulator
// iOS simulator: http://localhost:3000/api
// Production: https://your-domain.com/api

export const ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",         
  REFRESH: "/auth/refresh-token",
  REGISTER: "/users",
  OTP_REQUEST: "/auth/request-otp", 
  OTP_VERIFY: "/auth/verify-otp",
  FORGOT: "/auth/forgot-password",

  // categories
  CATEGORIES: "/user-categories/list-category",

  // user-categories
  USER_CATEGORIES: "/user-categories",
  CREATE_MANY_USER_CATEGORIES: "/user-categories/create-many",

  // Transactions
  TRANSACTIONS: "/transactions",

  // wallets
  WALLETS: "/wallets",

};
