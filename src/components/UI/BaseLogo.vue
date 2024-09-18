<script setup>
import { watch, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import BaseImg from './BaseImg.vue'
</script>
<template>
    <div class="logo_wrap">
        <BaseImg
            src="/images/logo/logo.svg"
            alt="logo"
            class="logo"
            v-bind="$attrs"
        />
    </div>
</template>

<style lang="scss" scoped>
.logo_wrap {
    display: flex;
    align-items: center;
}
.mobile {
    .logo {
        height: 50px;
    }
}
</style>
