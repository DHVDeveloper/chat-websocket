import { LoginFormData, RegisterFormData } from "@/domain/auth/auth.interface";
import { authRepository } from "@/repository/auth/auth.repository";
import { ApiResponse } from "@/types/apiResponse"
import { register } from "module";

export const authServices = {
    login: async (formData:LoginFormData): Promise<ApiResponse<null>> => {
        const loginResponse = await authRepository.login(formData);
        return loginResponse
    },
    register: async (formData:RegisterFormData): Promise<ApiResponse<null>> => {
        const registerRepository = await authRepository.register(formData);
        return registerRepository
        
    }
}