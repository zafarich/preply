<template>
    <BaseModal
        :model-value="privacyModal"
        @close="close"
        class="warning-modal relative"
        id="privacy-policy-modal"
    >
        <div class="row items-center q-pb-none bg-white">
            <div class="title-modal"></div>
            <q-space />
            <button class="close-modal_btn" v-close-popup>
                <img src="/images/icons/close-modal.png" alt="" />
            </button>
        </div>
        <PrivacyPolicyContent />
    </BaseModal>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'
import PrivacyPolicyContent from 'src/components/static-pages/privacy-policy-content.vue'

const modalStore = useModalStore()
const mainStore = useMainStore()

const router = useRouter()

const { privacyModal } = storeToRefs(modalStore)

const close = () => {
    privacyModal.value = false
}
</script>

<style lang="scss">
#privacy-policy-modal {
    .q-card {
        padding: 24px;
        /* width: 340px; */
        width: auto;
    }
    .container {
        background-color: #fdfdfd;
        height: 100%;
        width: 100%;
        // border-radius: 6px;
        // box-shadow: 0 4px 28px rgba(123, 151, 158, 0.25);
        // border: 1px solid #d6dee1;
        padding: 1rem;
        overflow: scroll;
    }
    h1 {
        margin: 0;
        text-align: center;
    }

    /* custom scrollbar */
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
}
</style>
