import { LoginFormData, RegisterFormData } from "@/domain/auth/auth.interface";
import { LoginFormDataRequest, RegisterFormDataRequest } from "./auth.interface";

export function mapLogintoLoginRequest(formData:LoginFormData):LoginFormDataRequest {
    return {
        email: formData.email,
        password: formData.password
    }
}


export function mapRegistertoRegisterRequest(formData:RegisterFormData):RegisterFormDataRequest {
    return {
        username: formData.username,
        email: formData.email,
        password: formData.password
    }
}