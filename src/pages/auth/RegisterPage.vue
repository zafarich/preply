<template>
    <div class="register-page">
        <div>
            <div class="app-container">
                <div class="text-lg font-medium text-center py-5 tracking-wide">
                    Register
                </div>

                <q-form ref="registerRef" @submit="submitForm">
                    <q-input
                        :label="$t('name')"
                        v-model="first_name"
                        :dense="false"
                        :rules="[validate.required]"
                        @keyup.enter="submitForm"
                    />
                    <q-input
                        :label="$t('surname')"
                        v-model="last_name"
                        :dense="false"
                        :rules="[validate.required]"
                        @keyup.enter="submitForm"
                    />
                    <!-- {{ phone }} -->
                    <q-input
                        v-model="phone"
                        type="tel"
                        class="phone"
                        mask="## ### ## ##"
                        :label="$t('phone')"
                        :rules="[validate?.required, validate?.phone_number]"
                        :dense="false"
                    >
                        <template #prepend> +998 </template>
                    </q-input>

                    <!-- @keyup.enter="submitForm" -->

                    <q-input
                        v-model="password1"
                        :type="isPwd1 ? 'password' : 'text'"
                        :rules="[validate.password]"
                        :label="$t('password')"
                        :dense="false"
                        @keyup.enter="submitForm"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd1 = !isPwd1"
                            />
                        </template>
                    </q-input>
                    <q-input
                        v-model="password2"
                        :type="isPwd2 ? 'password' : 'text'"
                        :rules="[
                            validate.password,
                            (v) => validate.passwordConfirm(v, password1),
                        ]"
                        :label="$t('passwordConfirm')"
                        :dense="false"
                        @keyup.enter="submitForm"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd2 = !isPwd2"
                            />
                        </template>
                    </q-input>

                    <q-btn
                        class="full-width mt-6"
                        color="primary"
                        no-caps
                        :label="$t('Continue')"
                        type="submit"
                    />
                    <div class="text-center mt-10">
                        {{ $t('have_account')
                        }}<router-link
                            class="text-primary"
                            :to="{ name: 'login' }"
                        >
                            {{ $t('logining') }}</router-link
                        >
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue-demi'
import { useUserStore } from 'src/stores/user'
import validate from 'src/utils/validate'
import BaseInput from 'src/components/UI/BaseInput.vue'
import { useQuasar } from 'quasar'
import { setTokenToCache } from 'src/utils/auth'
const userStore = useUserStore()
const registerRef = ref('')
const first_name = ref('')
const last_name = ref('')
const phone = ref('')
const password1 = ref('')
const password2 = ref('')

const isPwd1 = ref(true)
const isPwd2 = ref(true)

const $q = useQuasar()

let resetTimeout = 0
function resetValidation(timeout = 0) {
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => {
        registerRef.value.resetValidation()
    }, timeout)
}

const submitForm = async () => {
    resetValidation()
    const hasError = !(await registerRef.value.validate())
    if (hasError) return resetValidation(5000)

    try {
        const res = await userStore.register({
            first_name: first_name.value,
            last_name: last_name.value,
            phone: phone.value.replace(/\s/g, ''),
            password: password1.value,
            password2: password2.value,
        })

        if (res) {
            const loginRes = await userStore.login({
                phone: phone.value.replace(/\s/g, ''),
                password: password1.value,
            })

            router.push({ name: 'home' })
        }

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: $t('success_welcome'),
        })
    } catch (error) {
        console.log('rerro', error)
        // if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: $t('already_exists'),
        })
    }
}
</script>

<style lang="scss" scoped>
.register-page {
    display: flex;
    height: 100vh;
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
