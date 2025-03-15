// src/component/api.tsx
import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://bookstore.incubation.bridgelabz.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

interface ApiErrorResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  result: { accessToken: string } | null;
}

interface ApiBook {
  _id: string;
  bookName: string;
  author: string;
  price: number;
  quantity: number;
  bookImage?: string | null;
  discountPrice: number;
  description: string;
  [key: string]: any;
}

interface BooksResponse {
  success: boolean;
  message: string;
  result: ApiBook[];
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>("/bookstore_user/login", {
      email,
      password,
    });
    if (response.data.result && "accessToken" in response.data.result) {
      const { accessToken } = response.data.result;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    } else {
      throw new Error(response.data.message || "Login failed: No access token provided");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "please verify your account") {
      console.error("Login failed due to verification:", error.message);
      throw error;
    }
    const axiosError = error as AxiosError<ApiErrorResponse>;
    console.error("Login API error - Full Response:", JSON.stringify(axiosError.response?.data, null, 2));
    console.error("Login API error details:", {
      error,
      response: axiosError.response,
      data: axiosError.response?.data,
      status: axiosError.response?.status,
    });
    throw axiosError.response?.data?.message || axiosError.response?.data?.error
      ? new Error(axiosError.response.data.message || axiosError.response.data.error)
      : error instanceof Error
      ? error
      : new Error("Network error: Unable to reach the server or unexpected response");
  }
};

export const signup = async (userData: SignupData) => {
  try {
    const response = await api.post("/bookstore_user/registration", userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    console.error("Signup API error - Full Response:", JSON.stringify(axiosError.response?.data, null, 2));
    console.error("Signup API error details:", {
      error,
      response: axiosError.response,
      data: axiosError.response?.data,
      status: axiosError.response?.status,
    });
    throw axiosError.response?.data?.message || axiosError.response?.data?.error
      ? new Error(axiosError.response.data.message || axiosError.response.data.error)
      : new Error("Signup failed: Invalid data provided. Check the form and try again.");
  }
};

export const getBooks = async (): Promise<ApiBook[]> => {
  try {
    const response = await api.get<BooksResponse>("/bookstore_user/get/book");
    if (response.data.success && Array.isArray(response.data.result)) {
      return response.data.result;
    } else {
      throw new Error(response.data.message || "Failed to fetch books");
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    console.error("Get Books API error - Full Response:", JSON.stringify(axiosError.response?.data, null, 2));
    console.error("Get Books API error details:", {
      error,
      response: axiosError.response,
      data: axiosError.response?.data,
      status: axiosError.response?.status,
    });
    throw axiosError.response?.data?.message || axiosError.response?.data?.error
      ? new Error(axiosError.response.data.message || axiosError.response.data.error)
      : new Error("Failed to fetch books due to a network or server error");
  }
};

export default api;