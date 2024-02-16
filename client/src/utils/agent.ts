import axios, { AxiosResponse } from "axios";
import { BookClub } from "../models/bookclub";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BookClubs = {
  list: () => requests.get<BookClub[]>("/bookclubs"),
  details: (id: string) => requests.get<BookClub>(`/bookclubs/${id}`),
  create: (bookClub: BookClub) => axios.post<void>("/bookclubs", bookClub),
  update: (bookClub: BookClub) =>
    axios.put<void>(`/bookclubs/${bookClub.id}`, bookClub),
  delete: (id: string) => axios.delete<void>(`/bookclubs/${id}`),
};

const agent = {
  BookClubs,
};

export default agent;
