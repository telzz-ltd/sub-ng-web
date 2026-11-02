import axios from "axios";
import { getAuthToken, type User } from "../stores/auth";

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type AuthResponse = ApiResponse<{
  user: User;
  token: string;
}>;

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ResetPasswordInput = {
  email: string;
  code: string;
  password: string;
};

export type UpdateProfileInput = {
  name: string;
  email: string;
};

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function register(input: RegisterInput) {
  const { data } = await api.post<AuthResponse>("/auth/register", input);
  return data;
}

export async function login(input: LoginInput) {
  const { data } = await api.post<AuthResponse>("/auth/login", input);
  return data;
}

export async function sendEmailVerificationOtp() {
  const { data } = await api.post<ApiResponse<null>>("/auth/email/send-otp");
  return data;
}

export async function verifyEmail(input: { code: string }) {
  const { data } = await api.post<ApiResponse<User>>("/auth/email/verify", input);
  return data;
}

export async function sendPasswordResetOtp(input: { email: string }) {
  const { data } = await api.post<ApiResponse<null>>("/auth/password/send-otp", input);
  return data;
}

export async function resetPassword(input: ResetPasswordInput) {
  const { data } = await api.post<ApiResponse<null>>("/auth/password/reset", input);
  return data;
}

export async function updateProfile(input: UpdateProfileInput) {
  const { data } = await api.patch<ApiResponse<User>>("/auth/profile", input);
  return data;
}

export function isUnauthorizedError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}
