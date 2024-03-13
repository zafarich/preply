import * as api from "src/api/home";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", () => {
  async function getBrands(params) {
    const res = await api.getBrands(params);
    return res?.result;
  }
  return {
    getBrands,
  };
});
