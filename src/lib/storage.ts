import * as SecureStore from "expo-secure-store";

const ATK_KEY = "access_token";
const RTK_KEY = "refresh_token";

export async function saveTokens(atk: string, rtk: string) {
  await SecureStore.setItemAsync(ATK_KEY, atk);
  await SecureStore.setItemAsync(RTK_KEY, rtk);
}
export async function getAccessToken() {
  return SecureStore.getItemAsync(ATK_KEY);
}
export async function getRefreshToken() {
  return SecureStore.getItemAsync(RTK_KEY);
}
export async function clearTokens() {
  await SecureStore.deleteItemAsync(ATK_KEY);
  await SecureStore.deleteItemAsync(RTK_KEY);
}
