<template>
    <div class="top-header">
        <header class="header">
            <div class="w-[120px]">
                <router-link :to="{ name: 'home' }">
                    <img src="/images/logo_s_1.png" alt="" />
                </router-link>
            </div>
            <div class="flex justify-between items-center">
                <LangSwitcher />
                <UserDropDown
                    v-if="userStore.accessToken && userStore.userData.id"
                />
            </div>
        </header>
    </div>
    <div class="h-header"></div>
</template>

<script setup>
import { useUserStore } from 'src/stores/user'
import LangSwitcher from './LangSwitcher.vue'
import { useRouter, useRoute } from 'vue-router'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import UserDropDown from '../UserDropDown.vue'
import { useReferencesStore } from 'src/stores/references'

const userStore = useUserStore()
const router = useRouter()
const modalStore = useModalStore()
const referenceStore = useReferencesStore()
const route = useRoute()

const { periodPremiumModal } = storeToRefs(modalStore)

const goToProfile = () => {
    router.push({ name: 'profile' })
}

const showPremiumPeriodModal = () => {
    periodPremiumModal.value = true
}
</script>

<style lang="scss" scoped>
.top-header {
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid $gray-5;

    width: 100%;
    z-index: 15;
    //   background-color: $gray-6;
    background-color: $white;
}

.top-info {
    padding: 1px 10px;
    color: white;
    background: #804f9e;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    gap: 12px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 62px;
    padding: 8px 10px;
}
.h-header {
    height: 62px;
}
</style>
