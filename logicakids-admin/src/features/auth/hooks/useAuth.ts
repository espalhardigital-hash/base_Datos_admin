import { apiClient } from "../../../api/apiClient";
import { ENDPOINTS } from "../../../api/endpoints";

export const useAuth = () => {
  const login = async (data: any) => {
    try {
      // Intentamos hacer login con la API
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
        username: data.username,
        password: data.password,
      });
      
      const token = response.data.access_token || response.data.token;
      if (token) {
        localStorage.setItem("logicakids_token", token);
        window.location.href = "/";
      } else {
        throw new Error("No se recibió el token de autenticación");
      }
    } catch (error: any) {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    localStorage.removeItem("logicakids_token");
    window.location.href = "/login";
  };

  return { login, logout };
};
