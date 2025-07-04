import axiosInstance from '../config/axios';

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    // Re-lanza el error para que el componente que llama pueda manejarlo
    throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAdmin = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  return JSON.parse(user).role === 'admin';
};

// Configurar el interceptor para incluir el token en las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 