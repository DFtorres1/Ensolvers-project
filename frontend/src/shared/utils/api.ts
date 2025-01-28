import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const configuration = config;
  const token: string | null = sessionStorage.getItem("token");

  if (token && configuration.headers) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }

  return configuration;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const getCustomAxiosInstance = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);

  return axiosInstance;
};

const api = getCustomAxiosInstance(
  axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,
    withCredentials: true,
  })
);

export default api;
