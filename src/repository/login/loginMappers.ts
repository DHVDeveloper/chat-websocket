import { LoginFormData } from "@/pages/login/Login";
import { LoginFormDataRequest } from "./loginModels";

export function mapLogintoLoginRequest(formData:LoginFormData):LoginFormDataRequest {
    return {
        email: formData.email,
        password: formData.password
    }
}