import axios, { AxiosError, AxiosResponse } from "axios";
import { BookClub } from "../models/bookclub";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("Forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("Server error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
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
