import { ERROR_MESSAGES } from "@/constants/messages";
import { ApiResponse } from "@/types/apiResponse";

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || ERROR_MESSAGES.UNKNOWN_ERROR };
      }
  
      const data = await response.json();
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: ERROR_MESSAGES.SERVER_CONNECTION_ERROR };
    }
  }