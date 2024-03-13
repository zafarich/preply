import { api } from "src/boot/axios";

export async function loadRegions() {
  const { data } = await api("api/region/region");
  return data?.result;
}
export async function loadDistricts(id) {
  const { data } = await api("api/region/region/" + id);
  return data?.result;
}
