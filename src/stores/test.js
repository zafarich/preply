import * as api from "src/api/test";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { ref } from "vue-demi";

export const useTestStore = defineStore("test", () => {
  const test = ref(
    LocalStorage.getItem("test") || {
      type: "",
      variant_id: 3, // it can be [{subject: 1, variant: 3}]
      selected_answer: [],
      active_index: 0,
      active_subject: 0,
    }
  );

  async function getVariants(params) {
    const res = await api.getVariants(params);
    return res?.results;
  }

  function changeTestField(data) {
    test.value = { ...test.value, ...data };
    LocalStorage.set("test", test.value);
  }

  return {
    getVariants,
    changeTestField,
    test,
  };
});
