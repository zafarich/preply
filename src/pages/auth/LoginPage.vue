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
                        type="tel"
                        mask="## ### ## ##"
                        :label="$t('phone')"
                        :rules="[validate?.required, validate?.phone_number]"
                        :dense="false"
                    >
                        <template #prepend> +998 </template>
                    </q-input>
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

        <!-- <div class="login-footer">
            Avtorizatsiyadani davom ettirsangiz
            <router-link class="text-primary" :to="{ name: 'login-oferta' }"
                >ushbu qoidalarga</router-link
            >
            rozilik bildirasiz
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue-demi'
import { useUserStore } from 'src/stores/user'
import validate from 'src/utils/validate'
import { useQuasar } from 'quasar'
const userStore = useUserStore()

const phone = ref('')
const password = ref('')
const formRef = ref('')
const pwd = ref('')

const $q = useQuasar()

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
    try {
        await userStore.login({
            phone: phone.value.replace(/\s/g, ''),
            password: password.value,
        })

        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'You have authorized',
        })
    } catch (error) {
        console.log('rerro', error)
        // if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'User not found with this creadentials',
        })
    }
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

    .q-field__prepend {
        color: $dark !important;
        font-size: 14px !important;
        line-height: 17px !important;
        padding-right: 3px !important;
        font-weight: 500 !important;
    }
}
</style>
