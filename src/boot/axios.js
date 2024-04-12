import { boot } from "quasar/wrappers";
import axios from "axios";
import { getTokenFromCache } from "src/utils/auth";
import { Notify } from "quasar";
import { getServerError } from "src/utils/helpers";
import { useUserStore } from "src/stores/user";

const api = axios.create({ baseURL: process.env.BASE_URL });

export default boot(({ app }) => {
  const userStore = useUserStore();
  api.interceptors.request.use(
    (config) => {
      const token =
        getTokenFromCache() ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNzcwOTY1LCJpYXQiOjE3MTI1OTgxNjUsImp0aSI6IjU5MGVjYmNkYmUwMzRlYWFiNWEzY2M0ZWYxM2M1ZjE2IiwidXNlcl9pZCI6Mn0.wgmpmsqJ6cvQu8EX89oltQYpgl0VlO7yA90UtJEeJoI";
      if (token) config.headers.Authorization = "Bearer " + token;

      let lang = localStorage.getItem("locale");

      if (lang?.startsWith("uz")) lang = "uz";
      // config.headers["language"] = lang || "ru";

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      let message = getServerError(error, "errorMessage");
      const status = error?.response?.status;
      if ("pass" in error?.config) {
        return Promise.reject(error);
      }

      if (status === 401) {
        return { data: { result: null, error: true } };
      } else if (status?.toString()?.slice(0, 1) === 5) {
        message = "Internal Server Error";
      } else if (status === 405) {
        message = "Method Not Allowed";
      } else if (status === 404) {
        message = "Not Found";
      } else if (status === 403) {
        message = "403 Forbidden";
      } else {
        message = message ?? "Error 500. Backendda nomalum xatolik yuz berdi!";
      }

      // if (message) {
      //   Notify.create({
      //     progress: true,
      //     position: "top",
      //     message,
      //     type: "negative",
      //     timeout: 4000,
      //   });
      // }
      return { data: { result: null, error: true } };
    }
  );
});

export { api };
