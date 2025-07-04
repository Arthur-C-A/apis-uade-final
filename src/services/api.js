import axiosInstance from '../config/axios';

// Dishes
export const getDishes = () => axiosInstance.get('/dishes');
export const getDishesByCategory = (category) => axiosInstance.get(`/dishes/category/${category}`);
export const getDishById = (id) => axiosInstance.get(`/dishes/${id}`);
export const createDish = (data) => axiosInstance.post('/dishes', data);
export const updateDish = (id, data) => axiosInstance.put(`/dishes/${id}`, data);
export const deleteDish = (id) => axiosInstance.delete(`/dishes/${id}`);

// Reviews
export const getReviews = () => axiosInstance.get('/reviews');
export const getReviewById = (id) => axiosInstance.get(`/reviews/${id}`);
export const createReview = (data) => axiosInstance.post('/reviews', data);
export const updateReview = (id, data) => axiosInstance.put(`/reviews/${id}`, data);
export const deleteReview = (id) => axiosInstance.delete(`/reviews/${id}`);

// Users
export const getUsers = () => axiosInstance.get('/users');
export const createUser = (data) => axiosInstance.post('/users', data);
export const updateUser = (id, data) => axiosInstance.put(`/users/${id}`, data);
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`); 