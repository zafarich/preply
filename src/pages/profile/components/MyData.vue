<template>
    <div class="info-card my-4">
        <div
            class="flex justify-between gap-2 items-center pb-2 border-b border-gray-2"
        >
            <div class="font-semibold text-base">
                {{ $t('user_data') }}
            </div>

            <div>
                <q-btn
                    outline
                    color="negative"
                    size="xs"
                    class="mr-2 h-8"
                    @click="() => (logoutModal = true)"
                >
                    <div class="cursor-pointer">
                        <img src="/icons/logout.png" class="w-5 h-5" />
                    </div>
                </q-btn>
                <q-btn color="primary" size="xs" outline class="h-8">
                    <q-icon
                        name="eva-edit"
                        class="py-1"
                        color="primary"
                        size="xs"
                        @click="() => (userEditModal = true)"
                    />
                </q-btn>
            </div>
        </div>
        <div class="avatar">
            <img
                v-if="userStore.userData.image"
                :src="`${userStore.userData.image}`"
                alt="Image"
                class="object-cover w-full h-full"
            />
            <img v-else src="icons/user-icon.svg" alt="" class="w-[200px]" />
        </div>
        <div class="flex justify-start no-wrap gap-6">
            <div class="info-wrap w-full">
                <div class="info-item">
                    <div class="key">{{ $t('name') }}</div>
                    <div class="value">
                        {{ userStore.userData.first_name }}
                    </div>
                </div>
                <div class="info-item">
                    <div class="key">
                        {{ $t('surname') }}
                    </div>
                    <div class="value">
                        {{ userStore.userData.last_name }}
                    </div>
                </div>
                <div class="info-item">
                    <div class="key flex items-center gap-3">
                        Premium obuna
                        <img :src="TARIFFS.PREMIUM.icon" class="w-5 h-5" />
                    </div>
                    <div class="value">
                        <q-badge
                            v-if="userStore.userData.is_premium"
                            color="primary"
                            no-caps
                            size="sm"
                            @click="showPremiumPeriodModal"
                        >
                            <q-icon name="eva-checkmark" color="white" />
                        </q-badge>
                        <q-badge v-else color="red" no-caps size="sm">
                            <q-icon name="eva-close" color="white" />
                        </q-badge>
                    </div>
                </div>
                <div class="info-item">
                    <div class="key flex items-center gap-3">
                        Prime obuna
                        <img :src="TARIFFS.PRIME.icon" class="w-5 h-5" />
                    </div>
                    <div class="value">
                        <q-badge
                            v-if="userStore.userData.is_premium"
                            color="primary"
                            no-caps
                            size="sm"
                        >
                            <q-icon name="eva-checkmark" color="white" />
                        </q-badge>
                        <q-badge v-else color="red" no-caps size="sm">
                            <q-icon name="eva-close" color="white" />
                        </q-badge>
                    </div>
                </div>

                <div class="info-item">
                    <div class="key">Fayllar uchun parol</div>
                    <div class="value flex items-center">
                        <div class="bg-gray-200 pl-2 rounded-md text-gray-600">
                            {{ filePassword }}
                            <q-btn
                                outline
                                color="secondary"
                                @click="clickClipboard"
                            >
                                <q-icon name="eva-clipboard-outline" />
                            </q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from 'src/stores/modal'
import { storeToRefs } from 'pinia'
import { copyToClipboard, useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { TARIFFS } from 'src/utils/constants'
import { hashUserId } from 'src/utils/auth'

const props = defineProps({
    filePassword: {
        type: String,
        required: true,
    },
})

const modalStore = useModalStore()
const userStore = useUserStore()

const $q = useQuasar()

const { periodPremiumModal, userEditModal, logoutModal } =
    storeToRefs(modalStore)

const showPremiumPeriodModal = () => {
    periodPremiumModal.value = true
}

const clickClipboard = async () => {
    const compyItem = await hashUserId(userStore.userData.id)

    copyToClipboard(compyItem)
        .then(() => {
            $q.notify({
                type: 'positive',
                textColor: 'white',
                position: 'top',
                message: 'Password copied to clipboard',
            })
        })
        .catch(() => {
            $q.notify({
                type: 'negative',
                textColor: 'white',
                position: 'top',
                message: 'Failid copied to clipboard',
            })
        })
}
</script>
