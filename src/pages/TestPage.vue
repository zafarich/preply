<script setup>
import LangSwitcher from "src/components/LangSwitcher.vue";
import { ref } from "vue-demi";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const date = ref(null);
</script>
<template>
  <div class="text-test pt-8 bg-yellow">
    <div class="text-2xl text-center block">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
    <q-btn color="primary">{{ t("phone") }}</q-btn>

    <q-date v-model="date" minimal />
    <LangSwitcher />
  </div>
</template>
