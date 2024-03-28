import { api } from "src/boot/axios";

const url = "/api/v1/tests/";

export async function getVariants(params) {
  const { data } = await api(url + "test-variants/", { params });
  return data;
}
