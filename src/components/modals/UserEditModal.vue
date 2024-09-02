<template>
    <BaseModal
        :model-value="userEditModal"
        @close="close"
        @beforeShow="beforeShow"
        class="warning-modal"
    >
        <div class="row items-center q-pb-none">
            <div class="title-modal"></div>
            <q-space />
            <button class="close-modal_btn" v-close-popup>
                <img src="/images/icons/close-modal.png" alt="" />
            </button>
        </div>
        <q-form @submit="onChange">
            <div class="text-lg font-bold">{{ $t('change_data') }}</div>
            <div class="flex justify-center mt-6 mb-3 flex-col items-center">
                <div class="border-2 rounded-md w-24 h-24">
                    <img
                        v-if="userStore.userData.image"
                        :src="userStore.userData.image"
                        class="object-cover w-full h-full"
                    />
                    <img
                        v-else
                        src="icons/user-icon.svg"
                        alt=""
                        class="object-cover w-full h-full"
                    />
                </div>
            </div>

            <div class="mt-2 mb-3">
                <q-btn
                    @click="openFilePicker"
                    color="primary"
                    outline
                    class="w-full"
                >
                    <q-icon name="eva-camera-outline" size="xs" />

                    <span class="ml-2"> {{ $t('upload_photo') }} </span>
                </q-btn>
                <input
                    ref="fileInputRef"
                    type="file"
                    style="display: none"
                    @change="handleFileInputChange"
                />
            </div>

            <q-input
                :label="$t('name')"
                v-model="userData.first_name"
                class="mb-2"
                :rules="[
                    (val) =>
                        (val && val.length > 3) ||
                        $t('must_at_least_sign', { signCount: 3 }),
                ]"
            />
            <q-input
                :label="$t('surname')"
                v-model="userData.last_name"
                class="mb-6"
                :rules="[
                    (val) =>
                        (val && val.length > 3) ||
                        $t('must_at_least_sign', { signCount: 3 }),
                ]"
            />

            <button
                type="submit"
                class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
            >
                {{ $t('change') }}
            </button>
        </q-form>
    </BaseModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import { useUserStore } from 'src/stores/user'
import { onMounted } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['onChange'])
const userStore = useUserStore()

const modalStore = useModalStore()
const { userEditModal } = storeToRefs(modalStore)

const fileInputRef = ref('')
const image = ref('')

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

const openFilePicker = () => {
    fileInputRef.value.click()
}

const deleteImage = async () => {
    await emit('onChange', { image: '' })
}

const handleFileInputChange = (event) => {
    image.value = event.target.files[0]

    const formData = new FormData()

    formData.append('image', image.value)
    // userStore.updateUser(formData)
    emit('onChange', formData)
}
</script>
<style>
/* Your component styles here */
</style>
