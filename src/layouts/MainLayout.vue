<script setup>
import BottomMenu from "src/components/common/BottomMenu.vue";
import TheHeader from "src/components/common/TheHeader.vue";
</script>
<template>
  <div class="main-layout">
    <TheHeader />
    <router-view />
    <BottomMenu />
  </div>
</template>
