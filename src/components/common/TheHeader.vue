<script setup>
import LangSwitcher from './LangSwitcher.vue'
</script>
<template>
    <div>
        <header class="header">
            <div class="w-[120px]">
                <router-link :to="{ name: 'home' }">
                    <img src="/images/logo_s_1.png" alt="" />
                </router-link>
            </div>
            <div>
                <q-btn color="primary" size="md" class="mr-3">
                    <q-badge color="red" floating>4</q-badge>
                    <img src="icons/rendo-icon.png" class="w-5 h-5" />
                </q-btn>
                <!-- <q-btn color="warning" size="md" class="mr-3">
                    <img src="icons/white-warning.png" class="w-6 h-6" />
                </q-btn> -->

                <LangSwitcher />
            </div>
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
