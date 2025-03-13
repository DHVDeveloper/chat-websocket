import { apiFetch } from "@/utils/apiFetch";
import { authRoutes } from "./auth.routes";
import { LoginFormDataRequest } from "./auth.interface";
import { ApiResponse } from "@/types/apiResponse";

export const authRepository = {
  login: async (formDataToSend: LoginFormDataRequest): Promise<ApiResponse<null>> => {
      const response = await apiFetch<null>(authRoutes.login(), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
  
      return response;
    },
    register: async (formDataToRegister: LoginFormDataRequest): Promise<ApiResponse<null>> => {
        const response = await apiFetch<null>(authRoutes.register(), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToRegister),
        });
    
        return response;
      },
}