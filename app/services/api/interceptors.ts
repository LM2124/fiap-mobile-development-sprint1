/**
 * Interceptors para a API
 * Adiciona token de autenticação automaticamente
 */
import type { ApisauceInstance } from "apisauce"

import { STORAGE_KEYS } from "@/services/fakeApi"
import * as storage from "@/utils/storage"

/**
 * Configura interceptor de autenticação
 * Adiciona o Bearer token em todas as requisições
 */
export function setupAuthInterceptor(apisauce: ApisauceInstance) {
  // Request Interceptor: adicionar token
  apisauce.axiosInstance.interceptors.request.use(
    async (config) => {
      const token = storage.loadString(STORAGE_KEYS.AUTHTOKEN)

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      if (__DEV__) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          config.data ? `\nData: ${JSON.stringify(config.data, null, 2)}` : "",
        )
      }

      return config
    },
    (error) => {
      if (__DEV__) {
        console.error("[API Request Error]", error)
      }
      return Promise.reject(error)
    },
  )

  // Response Interceptor: log de respostas
  apisauce.axiosInstance.interceptors.response.use(
    (response) => {
      if (__DEV__) {
        console.log(
          `[API Response] ${response.status} ${response.config.url}`,
          response.data ? `\nData: ${JSON.stringify(response.data, null, 2)}` : "",
        )
      }
      return response
    },
    async (error) => {
      if (__DEV__) {
        console.error(
          `[API Response Error] ${error.config?.url}`,
          error.response?.status,
          error.response?.data,
        )
      }

      // TODO: Implementar refresh token quando disponível
      // if (error.response?.status === 401 && !error.config._retry) {
      //   error.config._retry = true
      //   // Tentar renovar token
      // }

      return Promise.reject(error)
    },
  )
}
