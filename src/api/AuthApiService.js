import { ApiClient } from "./ApiClient"

export const userRegisterApiService = (user) => {
    return ApiClient.post("/auth/register", user);
}

export const userLoginApiService = async (email, password) => {
    try {
      const response = await ApiClient.post(`auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };