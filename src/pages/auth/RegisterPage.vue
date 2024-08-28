<template>
    <div class="register-page">
        <div>
            <div class="app-container">
                <div class="text-lg text-center py-5">
                    <div class="font-bold">{{ $t('success_welcome') }}!</div>

                    <div class="font-medium mt-4">
                        {{ $t('register') }}
                    </div>
                </div>

                <div>
                    <div class="font-medium mb-2">{{ $t('name') }} :</div>
                    <input
                        v-model="first_name"
                        class="base-input w-full text-base"
                        :class="{ 'base-input__error': v$.first_name.$error }"
                    />
                    <div class="text-red mt-1.5" v-if="v$.first_name.$error">
                        <span v-if="v$.first_name.required.$invalid">
                            {{ $t('rules.required') }}
                        </span>
                    </div>
                </div>

                <div class="mt-4">
                    <div class="font-medium mb-2">{{ $t('surname') }} :</div>
                    <input
                        v-model="last_name"
                        class="base-input w-full text-base"
                        :class="{ 'base-input__error': v$.last_name.$error }"
                    />
                    <div class="text-red mt-1.5" v-if="v$.last_name.$error">
                        <span v-if="v$.last_name.required.$invalid">
                            {{ $t('rules.required') }}
                        </span>
                    </div>
                </div>

                <div class="mt-4">
                    <div class="font-medium mb-2">{{ $t('phone') }} :</div>

                    <input
                        v-model="phone"
                        class="base-input w-full text-base"
                        :class="{ 'base-input__error': v$.phone.$error }"
                        type="tel"
                        v-maska="'+998 ## ### ## ##'"
                        :label="$t('phone')"
                    />

                    <div class="text-red mt-1.5" v-if="v$.phone.$error">
                        <span v-if="v$.phone.required.$invalid">
                            {{ $t('rules.required') }}
                        </span>
                    </div>
                </div>

                <div class="relative mt-4">
                    <div class="font-medium mb-2">{{ $t('Password') }} :</div>
                    <input
                        v-model="password1"
                        :type="isPwd1 ? 'password' : 'text'"
                        :class="{ 'base-input__error': v$.password1.$error }"
                        :label="$t('Password')"
                        class="base-input w-full text-base !pr-10 tracking-widest"
                    />

                    <q-icon
                        :name="
                            isPwd1 ? 'eva-eye-outline' : 'eva-eye-off-outline'
                        "
                        class="cursor-pointer absolute right-4 top-[41px]"
                        @click="togglePassword1"
                        size="xs"
                    />

                    <div class="text-red mt-1.5" v-if="v$.password1.$error">
                        <span v-if="v$.password1.required.$invalid">
                            {{ $t('rules.required') }}
                        </span>
                    </div>
                </div>

                <div class="relative mt-4">
                    <div class="font-medium mb-2">{{ $t('Password') }} :</div>
                    <input
                        v-model="password2"
                        :type="isPwd2 ? 'password' : 'text'"
                        :class="{ 'base-input__error': v$.password2.$error }"
                        :label="$t('Password')"
                        class="base-input w-full text-base !pr-10 tracking-widest"
                    />

                    <q-icon
                        :name="
                            isPwd2 ? 'eva-eye-outline' : 'eva-eye-off-outline'
                        "
                        class="cursor-pointer absolute right-4 top-[41px]"
                        @click="togglePassword2"
                        size="xs"
                    />

                    <div class="text-red mt-1.5" v-if="v$.password2.$error">
                        <span v-if="v$.password2.required.$invalid">
                            {{ $t('rules.required') }}
                        </span>
                    </div>
                </div>

                <div class="my-2">
                    <div class="flex justify-start items-center">
                        <q-checkbox
                            color="secondary"
                            :label="$t('i_agree_terms')"
                            v-model="is_agree"
                        />
                    </div>
                    <div
                        class="text-secondary cursor-pointer"
                        @click="openPrivacyModal"
                    >
                        {{ $t('public_offer') }}
                    </div>
                </div>

                <q-btn
                    class="full-width mt-8"
                    color="primary"
                    no-caps
                    :label="$t('Continue')"
                    type="submit"
                    @click="submitForm"
                    :disable="!is_agree"
                />
                <div class="text-center mt-10 text-base">
                    {{ $t('have_account')
                    }}<router-link class="text-primary" :to="{ name: 'login' }">
                        {{ $t('logining') }}</router-link
                    >
                </div>
            </div>
        </div>
    </div>

    <PrivacyPolicyModal />
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useUserStore } from 'src/stores/user'
import validate from 'src/utils/validate'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'
import PrivacyPolicyModal from 'src/components/modals/PrivacyPolicyModal.vue'

const userStore = useUserStore()
const mainStore = useMainStore()
const modalStore = useModalStore()

const registerRef = ref('')
const first_name = ref('')
const last_name = ref('')
const phone = ref('+998 ')
const password1 = ref('')
const password2 = ref('')

const router = useRouter()

const isPwd1 = ref(true)
const isPwd2 = ref(true)

const is_agree = ref(false)

const togglePassword1 = () => {
    isPwd1.value = !isPwd1.value
}

const togglePassword2 = () => {
    isPwd2.value = !isPwd2.value
}

const $q = useQuasar()
const { t: $tranlate } = useI18n()

const rules = {
    first_name: { required },
    last_name: { required },
    phone: { required, minLength: minLength(17) },
    password1: { required },
    password2: { required },
}

const v$ = useVuelidate(rules, {
    phone,
    password1,
    password2,
    last_name,
    first_name,
})

const openPrivacyModal = () => {
    modalStore.changePrivacyModal(true)
}

const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate()

    if (!isFormCorrect) {
        return
    }
    try {
        const res = await userStore.register({
            first_name: first_name.value,
            last_name: last_name.value,
            phone: phone.value.replace(/\s/g, ''),
            password: password1.value,
            password2: password2.value,
        })

        if (res) {
            const response = await userStore.login({
                phone: phone.value.replace(/\s/g, ''),
                password: password1.value,
            })

            router.push({ name: 'home' })

            if (response.refresh && response.access) {
                setTimeout(() => {
                    mainStore.changeFireWorks(true)
                }, 1000)
            }
        }

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            position: 'top',
            icon: 'cloud_done',
            message: $tranlate('success_welcome'),
        })
    } catch (error) {
        console.log('rerro', error)
        // if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            position: 'top',
            message: $tranlate('already_exists'),
        })
    }
}
</script>

<style lang="scss" scoped>
.register-page {
    display: flex;

    align-content: space-between;
    flex-wrap: wrap;
    & > div {
        width: 100%;
    }
    .login-footer {
        padding: 60px 60px;
        text-align: center;
    }

    .q-field__prepend {
        color: #444 !important;
        font-size: 14px !important;
        line-height: 17px !important;
        padding-right: 3px !important;
        font-weight: 500 !important;
    }
}
</style>
