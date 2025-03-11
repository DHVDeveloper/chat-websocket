import { apiFetch } from "@/utils/apiFetch";
import { loginRoutes } from "./loginRoutes";
import { LoginFormDataRequest } from "./loginModels";
import { ApiResponse } from "@/types/apiResponse";

export const loginRepository = {
    login: async (formDataToSend: LoginFormDataRequest): Promise<ApiResponse<null>> => {
        const response = await apiFetch<null>(loginRoutes.login(), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        });
    
        return response;
      },
    }