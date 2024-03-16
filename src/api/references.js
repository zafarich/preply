import { api } from "src/boot/axios";

const url = "/api/v1/references/";

export async function loadRegions() {
  const { data } = await api("api/region/region");
  return data?.result;
}
export async function loadDistricts(id) {
  const { data } = await api("api/region/region/" + id);
  return data?.result;
}
export async function getSubjects(params) {
  const { data } = await api(url + "subjects/", { params });
  return data;
}
