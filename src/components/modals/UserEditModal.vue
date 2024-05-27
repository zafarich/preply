<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { onMounted } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['onChange'])

const modalStore = useModalStore()
const { userEditModal } = storeToRefs(modalStore)

const props = defineProps({
    first_name: {
        type: String,
        default: '',
    },
    last_name: {
        type: String,
        default: '',
    },
})

const userData = ref({
    first_name: '',
    last_name: '',
})

onMounted(() => {
    console.log('modal mounted')
})

const onChange = () => {
    emit('onChange', { ...userData.value })
    userEditModal.value = false
}

const close = () => {
    userEditModal.value = false
}

const beforeShow = () => {
    userData.value.first_name = props.first_name
    userData.value.last_name = props.last_name
}
</script>

<template>
    <BaseModal
        :model-value="userEditModal"
        @close="close"
        @beforeShow="beforeShow"
        class="warning-modal"
    >
        <q-form @submit="onChange">
            <div class="text-lg font-bold">{{ $t('change_data') }}</div>
            <q-input
                :label="$t('name')"
                v-model="userData.first_name"
                class="mb-2"
                :dense="false"
                :rules="[
                    (val) =>
                        (val && val.length > 3) ||
                        'Eng kamida 3 ta harf bo`lishi kerak',
                ]"
            />
            <q-input
                :label="$t('surname')"
                v-model="userData.last_name"
                :dense="false"
                class="mb-6"
                :rules="[
                    (val) =>
                        (val && val.length > 3) ||
                        'Eng kamida 3 ta harf bo`lishi kerak',
                ]"
            />
            <div class="grid grid-cols-2 gap-4">
                <button
                    v-close-popup
                    class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
                >
                    {{ $t('no') }}
                </button>
                <button
                    type="submit"
                    class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
                >
                    {{ $t("O'zgartirish") }}
                </button>
            </div>
        </q-form>
    </BaseModal>
</template>

<style>
/* Your component styles here */
</style>
