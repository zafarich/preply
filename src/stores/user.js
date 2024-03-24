import * as api from "src/api/user";
import { defineStore } from "pinia";
import { ref } from "vue-demi";

export const useUserStore = defineStore("user", () => {
  const all_count = ref(0);
  async function getLeaders(params) {
    const res = await api.getLeaders(params);
    return res?.results;
  }
  async function login(payload) {
    const res = await api.login(payload);
    return res;
  }

  return {
    getLeaders,
    login,
  };
});
