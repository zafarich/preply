<script setup>
import BottomMenu from 'src/components/common/BottomMenu.vue'

import Fireworks from 'src/components/Fireworks.vue'
</script>
<template>
    <Fireworks />

    <div class="bottom-menu-layout">
        <router-view />
        <BottomMenu />
    </div>
</template>
