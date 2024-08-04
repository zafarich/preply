<script setup>
import { useUserStore } from 'src/stores/user'
import LangSwitcher from './LangSwitcher.vue'
import { useRouter } from 'vue-router'
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const router = useRouter()
const modalStore = useModalStore()

const { periodPremiumModal } = storeToRefs(modalStore)

const goToProfile = () => {
    router.push({ name: 'profile' })
}

const showPremiumPeriodModal = () => {
    periodPremiumModal.value = true
}
</script>
<template>
    <div>
        <header class="header">
            <div class="w-[120px]">
                <router-link :to="{ name: 'home' }">
                    <img src="/images/logo_s_1.png" alt="" />
                </router-link>
            </div>
            <div class="flex justify-between items-center">
                <div v-if="userStore.token && userStore.userData.id">
                    <q-btn
                        v-if="userStore.userData.is_premium"
                        color="warning"
                        size="md"
                        outline
                        class="mr-3"
                        @click="showPremiumPeriodModal"
                    >
                        <img src="/icons/premium.png" class="h-6" />
                    </q-btn>

                    <q-btn
                        v-else
                        color="warning"
                        size="md"
                        class="mr-3"
                        @click="goToProfile"
                    >
                        <img src="/icons/white-warning.png" class="w-6 h-6" />
                    </q-btn>
                </div>

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
