import { boot } from "quasar/wrappers";
import axios from "axios";
import { getTokenFromCache } from "src/utils/auth";
import { Notify } from "quasar";
import { getServerError } from "src/utils/helpers";
const api = axios.create({ baseURL: process.env.API });
export default boot(({ app }) => {
  api.interceptors.request.use(
    (config) => {
      const token = "20|BQGslIUOrj9kwcxxpnPB0XE433MH8GnBtujj2uTT";
      if (token) config.headers.Authorization = "Bearer " + token;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response?.data || response;
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
        message = message ?? "Error 500. Backanda nomalum xatolik yuz berdi!";
      }

      if (message) {
        Notify.create({
          progress: true,
          position: "top",
          message,
          type: "negative",
          timeout: 6000,
        });
      }

      return { data: { result: null, error: true } };
    }
  );
});

export { api };
