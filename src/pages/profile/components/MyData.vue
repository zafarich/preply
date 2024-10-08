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
                    <div class="key">ID</div>
                    <div class="value">
                        {{ userStore.userData.id }}
                    </div>
                </div>
                <div class="info-item">
                    <div class="key flex items-center gap-3">
                        {{ $t('prime_subs') }}
                        <img :src="TARIFFS.PRIME.icon" class="w-5 h-5" />
                    </div>
                    <div class="value">
                        <q-badge
                            v-if="userStore.userData.is_prime"
                            color="primary"
                            no-caps
                            class="py-2"
                        >
                            {{
                                $t('until_date', {
                                    date: userStore.userData
                                        .prime_expiration_date,
                                })
                            }}
                        </q-badge>
                        <q-badge class="py-2" v-else color="red" no-caps>
                            {{ $t('not_available') }}
                        </q-badge>
                    </div>
                </div>
                <div class="info-item">
                    <div class="key flex items-center gap-3">
                        {{ $t('premium_subs') }}
                        <img :src="TARIFFS.PREMIUM.icon" class="w-5 h-5" />
                    </div>
                    <div class="value">
                        <q-badge
                            class="py-2"
                            v-if="userStore.userData.is_premium"
                            color="primary"
                            no-caps
                        >
                            <span v-if="userStore.userData.is_premium === true">
                                <img src="/icons/infinity.png" class="w-3.5" />
                            </span>

                            <span v-else>
                                {{ userStore.userData.is_premium }}
                                {{ $t('file') }}
                            </span>
                        </q-badge>
                        <q-badge class="py-2" v-else color="red" no-caps>
                            {{ $t('not_available') }}
                        </q-badge>
                    </div>
                </div>

                <div class="info-item">
                    <div class="key">{{ $t('password_for_files') }}</div>
                    <div class="value flex items-center">
                        <div
                            class="flex justify-start items-center bg-gray-200 rounded-md text-gray-600"
                        >
                            <div class="px-1.5 blur-[2px]">
                                {{ filePassword }}
                            </div>
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
import { useMainStore } from 'src/stores/main'

import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

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
                message: $t('password_saved_clipboard'),
            })
        })
        .catch(() => {
            $q.notify({
                type: 'negative',
                textColor: 'white',
                position: 'top',
                message: $t('error_occured'),
            })
        })
}
</script>
