<script setup>
import { onBeforeMount } from "vue-demi";
import { useMainStore } from "stores/main";
const mainStore = useMainStore();

onBeforeMount(() => {
  mainStore.setLanguage();
});
</script>

<template>
  <router-view />
</template>
<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
