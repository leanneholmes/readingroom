import axios, { AxiosError, AxiosResponse } from "axios";
import { BookClub, BookClubFormValues } from "../models/bookclub";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Photo, Profile, UserBookClub } from "../models/profile";
import { PaginatedResult } from "../models/pagination";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(200);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-found");
        }
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
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BookClubs = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<BookClub[]>>("bookclubs", { params })
      .then(responseBody),
  details: (id: string) => requests.get<BookClub>(`/bookclubs/${id}`),
  create: (bookClub: BookClubFormValues) =>
    requests.post<void>("/bookclubs", bookClub),
  update: (bookClub: BookClubFormValues) =>
    requests.put<void>(`/bookclubs/${bookClub.id}`, bookClub),
  delete: (id: string) => requests.delete<void>(`/bookclubs/${id}`),
  join: (id: string) => requests.post<void>(`/bookclubs/${id}/join`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  listBookClubs: (username: string) =>
    requests.get<UserBookClub[]>(`/profiles/${username}/bookclubs`),
};

const agent = {
  BookClubs,
  Account,
  Profiles,
};

export default agent;
