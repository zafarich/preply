<script setup>
import LangSwitcher from "./LangSwitcher.vue";
</script>
<template>
  <div>
    <header class="header">
      <div class="w-[120px]">
        <router-link :to="{ name: 'home' }">
          <img src="/images/logo_s_1.png" alt="" />
        </router-link>
      </div>
      <LangSwitcher />
    </header>

    <div class="h-header"></div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 8px 10px;
  border-bottom: 1px solid $gray-5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 15;
  //   background-color: $gray-6;
  background-color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
}
.h-header {
  height: 62px;
}
</style>
