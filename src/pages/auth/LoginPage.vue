<template>
    <div class="login-page">
        <div>
            <!-- <BackPanel :title="$t('personal_cabinet')" /> -->

            <div class="app-container">
                <div class="text-lg font-medium text-center py-5 tracking-wide">
                    <!-- {{ $t('Welcome') }} -->
                    {{ $t('login') }}
                </div>

                <q-form ref="formRef" @submit="submitForm">
                    <!-- type="tel" -->
                    <q-input
                        v-model="phone"
                        :label="$t('Phone')"
                        mask="+998 ## ### ## ##"
                        :dense="false"
                        :rules="[validate?.required, validate?.phone_number]"
                    />
                    <q-input
                        v-model="password"
                        :type="isPwd ? 'password' : 'text'"
                        :rules="[validate.password]"
                        :label="$t('Password')"
                        :dense="false"
                        @keyup.enter="submitForm"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>

                    <q-btn
                        class="full-width mt-6"
                        color="primary"
                        no-caps
                        type="submit"
                        :label="$t('Continue')"
                    />
                    <div class="text-center mt-10">
                        Sizda akkount mavjud bo'lmasa<router-link
                            class="text-primary"
                            :to="{ name: 'register' }"
                        >
                            ro'yhatdan o'ting</router-link
                        >
                    </div>
                </q-form>
            </div>
        </div>

        <div class="login-footer">
            Avtorizatsiyadani davom ettirsangiz
            <router-link class="text-primary" :to="{ name: 'login-oferta' }"
                >ushbu qoidalarga</router-link
            >
            rozilik bildirasiz
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue-demi'
import { useUserStore } from 'src/stores/user'
import validate from 'src/utils/validate'

const userStore = useUserStore()

const phone = ref('')
const password = ref('')
const formRef = ref('')
const pwd = ref('')

let resetTimeout = 0
function resetValidation(timeout = 0) {
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => {
        formRef.value.resetValidation()
    }, timeout)
}

const submitForm = async () => {
    resetValidation()
    const hasError = !(await formRef.value.validate())
    if (hasError) return resetValidation(5000)

    userStore.login({
        phone: phone.value.replace(/\s/g, ''),
        password: password.value,
    })
}
</script>

<style lang="scss" scoped>
.login-page {
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
}
</style>
