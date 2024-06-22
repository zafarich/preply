<template>
    <div class="login-page">
        <div>
            <!-- <BackPanel :title="$t('personal_cabinet')" /> -->

            <div class="app-container">
                <div
                    class="text-lg font-medium text-center py-5 tracking-widenfont-bold"
                >
                    <!-- {{ $t('Welcome') }} -->
                    {{ $t('login') }}
                </div>

                <q-form ref="formRef" @submit="submitForm">
                    <!-- type="tel" -->
                    <q-input
                        v-model="phone"
                        type="tel"
                        mask="+### ## ### ## ##"
                        :label="$t('phone')"
                        :rules="[validate?.required, validate?.phone_number]"
                        :dense="false"
                    >
                        <!-- <template #prepend> +998 </template> -->
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
                        {{ $t('dont_have_account') }}
                        <router-link
                            class="text-primary"
                            :to="{ name: 'register' }"
                        >
                            {{ $t('registering') }}</router-link
                        >
                    </div>
                </q-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue-demi'
import { useUserStore } from 'src/stores/user'
import validate from 'src/utils/validate'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMainStore } from 'src/stores/main'

const userStore = useUserStore()
const mainStore = useMainStore()

const route = useRoute()
const router = useRouter()
const phone = ref('+998 ')
const password = ref('')
const formRef = ref('')
const pwd = ref('')

const { t: $tranlate } = useI18n()

const $q = useQuasar()

let resetTimeout = 0
function resetValidation(timeout = 0) {
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => {
        formRef.value.resetValidation()
    }, timeout)
}

function phoneFocus() {
    if (!phone.length) phone.value = '+998'
}

const submitForm = async () => {
    resetValidation()
    const hasError = !(await formRef.value.validate())
    if (hasError) return resetValidation(5000)

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
