import * as api from "src/api/test";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { ref } from "vue-demi";

export const useTestStore = defineStore("test", () => {
  const default_test = {
    type: "",
    variant_id: 3, // it can be [{subject: 1, variant: 3}]
    selected_answer: [],
    active_index: 0,
    active_subject: 0,
  };
  const test_response = ref(LocalStorage.getItem("test_response") || null);
  const questions = ref(LocalStorage.getItem("questions") || []);
  const test = ref(
    LocalStorage.getItem("test") || {
      ...default_test,
    }
  );

  async function getVariants(params) {
    const res = await api.getVariants(params);
    return res?.results;
  }
  async function getSimpleTest(id) {
    const res = await api.getSimpleTest(id);
    test_response.value = res;
    questions.value = res.questions;
    LocalStorage.set("test_response", res);
    LocalStorage.set("questions", questions.value);
    return res;
  }
  async function startTest(payload) {
    const res = await api.startTest(payload);
    return res;
  }
  async function endTest(payload) {
    const res = await api.endTest(payload);
    return res;
  }
  function changeTestField(data) {
    test.value = { ...test.value, ...data };
    LocalStorage.set("test", test.value);
  }

  function setSelectedAnswer(index, question_index) {
    questions.value[question_index].selected_answer = index;
    LocalStorage.set("questions", questions.value);
  }

  function resetStore() {
    test.value = { ...default_test };
    questions.value = [];
    test_response.value = null;

    LocalStorage.set("test", { ...default_test });
    LocalStorage.set("questions", []);
    LocalStorage.set("test_response", null);
  }

  return {
    getVariants,
    changeTestField,
    test,
    test_response,
    getSimpleTest,
    startTest,
    setSelectedAnswer,
    questions,
    resetStore,
    endTest,
  };
});
