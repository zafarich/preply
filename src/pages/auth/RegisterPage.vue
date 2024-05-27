<template>
    <div class="login-page">
        <div>
            <div class="app-container">
                <div class="text-lg font-medium text-center py-5 tracking-wide">
                    Register
                </div>

                <q-form ref="formRef" @submit="submitForm">
                    <q-input
                        :label="$t('name')"
                        v-model="first_name"
                        :dense="false"
                        :rules="[
                            (val) =>
                                (val && val.length > 3) ||
                                `To'g'ri formatda kiriting`,
                        ]"
                    />
                    <q-input
                        :label="$t('surname')"
                        v-model="last_name"
                        :dense="false"
                        :rules="[
                            (val) =>
                                (val && val.length > 3) ||
                                `To'g'ri formatda kiriting`,
                        ]"
                    />

                    <q-input
                        v-model="phone"
                        :label="$t('Phone')"
                        :dense="false"
                        :rules="[
                            (val) =>
                                (val && val.length > 3) ||
                                `To'g'ri formatda kiriting`,
                        ]"
                    />

                    <q-input
                        v-model="password1"
                        :type="isPwd1 ? 'password' : 'text'"
                        :rules="[
                            (val) =>
                                (val && val.length > 3) ||
                                `To'g'ri formatda kiriting`,
                        ]"
                        :label="$t('Password 1')"
                        :dense="false"
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
                            (val) =>
                                (val && val.length > 3) ||
                                `To'g'ri formatda kiriting`,
                        ]"
                        :label="$t('Password 2')"
                        :dense="false"
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
                        @click="tryLogin"
                        :label="$t('Continue')"
                    />
                    <div class="text-center mt-10">
                        Sizda akkount mavjud bo'lsa<router-link
                            class="text-primary"
                            :to="{ name: 'login' }"
                        >
                            login qiling</router-link
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
import BackPanel from 'src/components/BackPanel.vue'
import BaseInput from 'src/components/UI/BaseInput.vue'
import { PHONE_PREFIX } from 'src/utils/helpers'
import { ref } from 'vue-demi'

const first_name = ref('')
const last_name = ref('')
const phone = ref('')
const password1 = ref('')
const password2 = ref('')

const isPwd1 = ref(true)
const isPwd2 = ref(true)

const submitForm = () => {}
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
