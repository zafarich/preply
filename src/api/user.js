import { api } from "src/boot/axios";

const url = "/api/v1/users/";

export async function getLeaders() {
  const { data } = await api(url + "leaders/");
  return data?.result;
}
export async function me() {
  const { data } = await api(url);
  return data;
}
export async function login(payload) {
  const { data } = await api.post(url + "login/", payload, {
    pass: true,
  });
  return data;
}
