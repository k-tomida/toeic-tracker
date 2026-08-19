import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// リクエスト時にトークンを自動付与
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//エラー時
apiClient.interceptors.response.use(
    (res) => res,
    (error) => {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.detail ?? "エラーが発生しました";
            return Promise.reject(new Error(message, { cause: error }));
        }
        return Promise.reject(error);
    }
);
