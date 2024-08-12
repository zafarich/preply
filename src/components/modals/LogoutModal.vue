<template>
    <BaseModal :model-value="logoutModal" @close="close" class="warning-modal">
        <div>
            <div class="row items-center q-pb-none">
                <div class="title-modal"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>
            <div class="flex justify-center mb-3">
                <img src="/icons/logout.png" class="w-8 h-8" />
            </div>
            <div class="font-semibold text-lg mb-2 text-center">
                {{ $t('are_you_sure_logout_profile') }}
            </div>
            <button
                class="px-5 w-full h-10 text-base text-white rounded-xl bg-red mt-5"
                @click="logout"
            >
                {{ $t('exit') }}
            </button>
        </div>
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()

const router = useRouter()

const { logoutModal } = storeToRefs(modalStore)

const close = () => {
    logoutModal.value = false
}

const logout = () => {
    useUserStore().logoutProfile()

    router.push({ name: 'login' })
    logoutModal.value = false
}
</script>

<style>
/* Your component styles here */
</style>
