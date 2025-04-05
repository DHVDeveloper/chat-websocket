import { LoginFormData } from "@/pages/login/Login"
import { loginRepository } from "@/repository/login/loginRepository"
import { ApiResponse } from "@/types/apiResponse"

export const loginServices = {
    login: async (formData:LoginFormData): Promise<ApiResponse<null>> => {
        const loginResponse = await loginRepository.login(formData);
        return loginResponse
        
    }
}