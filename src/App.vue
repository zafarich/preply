<script setup>
import { onBeforeMount } from 'vue-demi'
import { useLangStore } from 'stores/lang.store'

const langStore = useLangStore()

onBeforeMount(() => {
    langStore.setLanguage()
})
</script>

<template>
    <router-view />
</template>
<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
