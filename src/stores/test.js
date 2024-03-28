import * as api from "src/api/test";
import { defineStore } from "pinia";

export const useTestStore = defineStore("test", () => {
  async function getVariants(params) {
    const res = await api.getVariants(params);
    return res?.results;
  }

  return {
    getVariants,
  };
});
