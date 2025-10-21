import axios, { AxiosError } from "axios";
import { BASE_URL, ENDPOINTS } from "../config";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "./storage";
export const USE_MOCK_OTP = true;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

api.interceptors.request.use(async (config) => {
  const atk = await getAccessToken();
  if (atk) config.headers.Authorization = `Bearer ${atk}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as any;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Đợi token mới
        return new Promise((resolve) => {
          queue.push((token) => {
            if (!token) return resolve(Promise.reject(error));
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const rtk = await getRefreshToken();
        if (!rtk) throw new Error("No refresh token");

        const resp = await axios.post(`${BASE_URL}${ENDPOINTS.REFRESH}`, {
          refreshToken: rtk,
          refresh_token: rtk,
        });
        const data = (resp.data?.data ?? resp.data) as any;
        const newAT = data.accessToken || data.access_token;
        const newRT = data.refreshToken || data.refresh_token || rtk;

        await saveTokens(newAT, newRT);
        original.headers.Authorization = `Bearer ${newAT}`;
        queue.forEach((cb) => cb(newAT));
        queue = [];
        return api(original);
      } catch (e) {
        queue.forEach((cb) => cb(null));
        queue = [];
        await clearTokens();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// ===== API helpers =====
export async function login(email: string, password: string) {
  const resp = await axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, { email, password });
  const d = (resp.data?.data ?? resp.data) as any;
  const access = d.accessToken || d.access_token;
  const refresh = d.refreshToken || d.refresh_token;
  const need2FA = !!(d.need2FA ?? d.need_otp);
  const user = d.user ?? d.profile ?? null;
  return { access, refresh, need2FA, user };
}

export async function register(data: any) {
  const resp = await axios.post(`${BASE_URL}${ENDPOINTS.REGISTER}`, data);
  return resp.data?.data ?? resp.data;
}

export async function requestOtp(email: string, purpose: "register" | "2fa" | "reset") {
   if (USE_MOCK_OTP) {
    await new Promise(r => setTimeout(r, 500));
    return {  success: true , data: { otp: "000000" } };
  }
  const resp = await axios.post(`${BASE_URL}${ENDPOINTS.OTP_REQUEST}`, { email, purpose });
  return resp.data?.data ?? resp.data;
}

export async function verifyOtp(email: string, code: string, purpose: "register" | "2fa" | "reset",  pendingUser?: { name: string; password: string; confirmPassword: string }) {
  const resp = await axios.post(`${BASE_URL}${ENDPOINTS.OTP_VERIFY}`, { email, code, purpose });
  return resp.data?.data ?? resp.data;
}

export async function forgotPassword(email: string) {
  if (USE_MOCK_OTP) {
    return { success: true, data: { message: "Mã xác thực đã được gửi" } };
  }
  const resp = await axios.post(`${BASE_URL}${ENDPOINTS.FORGOT}`, { email });
  return resp.data?.data ?? resp.data;
}

// ===== Wallets APIs =====

export async function listWallets() {
  const resp = await api.get(`${BASE_URL}${ENDPOINTS.WALLETS}`);
  return resp.data?.data ?? resp.data;
}

export async function createWallet(data: any) {
  const resp = await api.post(`${BASE_URL}${ENDPOINTS.WALLETS}`, data);
  return resp.data?.data ?? resp.data;
}

// ===== User Categories APIs =====
export async function getListCategories() {
  const resp = await api.get(`${BASE_URL}${ENDPOINTS.CATEGORIES}`);
  return resp.data?.data ?? resp.data;
}

export async function createUserCategories(data: any) {
  const resp = await api.post(`${BASE_URL}${ENDPOINTS.CREATE_MANY_USER_CATEGORIES}`, data);
  return resp.data?.data ?? resp.data;
}

// ===== Transactions APIs =====
export async function createTransaction(data: any) {
  const resp = await api.post(`${BASE_URL}${ENDPOINTS.TRANSACTIONS}`, data);
  return resp.data?.data ?? resp.data;
}

export async function updateTransaction(id: number, data: any) {
  const resp = await api.put(`/transactions/${id}`, data);
  return resp.data?.data ?? resp.data;
}

export async function listTransactionsChat(page=1, limit=30) {
  const resp = await api.get(`/transactions`, { params: { page, limit, chat: "1" } });
  return resp.data?.data ?? resp.data;
}



