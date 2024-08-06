<template>
    <div class="login-page">
        <div class="app-container">
            <div class="text-lg text-center py-5">
                <div class="font-bold">{{ $t('success_welcome') }}!</div>

                <div class="font-medium mt-4">
                    {{ $t('login') }}
                </div>
            </div>
            <div>
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
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    :class="{ 'base-input__error': v$.password.$error }"
                    :label="$t('Password')"
                    @keyup.enter="submitForm"
                    class="base-input w-full text-base !pr-10 tracking-widest"
                />

                <q-icon
                    :name="isPwd ? 'eva-eye-outline' : 'eva-eye-off-outline'"
                    class="cursor-pointer absolute right-4 top-[41px]"
                    @click="togglePassword"
                    size="xs"
                />

                <div class="text-red mt-1.5" v-if="v$.password.$error">
                    <span v-if="v$.password.required.$invalid">
                        {{ $t('rules.required') }}
                    </span>
                </div>
            </div>
            <q-btn
                class="full-width mt-8"
                color="primary"
                no-caps
                type="submit"
                :label="$t('Continue')"
                @click="submitForm"
            />
            <div class="text-center mt-10 text-base">
                {{ $t('dont_have_account') }}
                <router-link class="text-primary" :to="{ name: 'register' }">
                    {{ $t('registering') }}</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue-demi'
import { useUserStore } from 'src/stores/user'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from 'src/stores/main'

const userStore = useUserStore()
const mainStore = useMainStore()

const router = useRouter()
const phone = ref('+998 ')
const password = ref('')
const isPwd = ref(false)

const { t: $tranlate } = useI18n()

const $q = useQuasar()

const rules = {
    phone: { required, minLength: minLength(17) },
    password: { required },
}

const v$ = useVuelidate(rules, { phone, password })

const togglePassword = () => {
    isPwd.value = !isPwd.value
}

const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate()

    if (!isFormCorrect) {
        return
    }

    mainStore.changeSiteLoader(true)
    try {
        await userStore.login({
            phone: phone.value.replace(/\s/g, ''),
            password: password.value,
        })

        router.push({ name: 'home' })

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'top',
            message: $tranlate('success_welcome'),
        })
    } catch (error) {
        console.log('rerro', error)
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            position: 'top',
            icon: 'warning',
            message: $tranlate('user_not_found'),
        })
    }

    mainStore.changeSiteLoader(false)
}
</script>

<style lang="scss" scoped>
.login-page {
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
        color: $dark !important;
        font-size: 14px !important;
        line-height: 17px !important;
        padding-right: 3px !important;
        font-weight: 500 !important;
    }
}
</style>
