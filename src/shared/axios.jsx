import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor 통해 로그인/회원가입을 제외한 모든 API 요청에 JWT 헤더에 포함시킴
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AccessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor 통해 응답 에러 처리
api.interceptors.response.use(
  (config) => config,
  (error) => error.response
);

// 전역 axios 사용
export const apis = {
  // auth page(/)
  signUp: ({ email, password }) =>
    api.post(`/auth/signup`, {
      email,
      password,
    }),
  signIn: ({ email, password }) =>
    api.post(`/auth/signin`, {
      email,
      password,
    }),

  // todoList page(/todo)
  createTodo: ({ todo }) =>
    api.post(`/todos`, {
      todo,
    }),
  getTodos: () => api.get(`/todos`),
  updateTodo: ({ id, todo, isCompleted }) =>
    api.put(`/todos/${id}`, {
      todo,
      isCompleted,
    }),
  deleteTodo: ({ id }) => api.delete(`/todos/${id}`),
};
