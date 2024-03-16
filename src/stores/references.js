import * as api from "src/api/references";
import { defineStore } from "pinia";

export const useReferencesStore = defineStore("references", () => {
  async function getSubjects(params) {
    const res = await api.getSubjects(params);
    return res?.results;
  }
  return {
    getSubjects,
  };
});
