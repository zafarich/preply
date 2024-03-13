<template>
  <div class="login-page">
    <div>
      <BackPanel :title="$t('Personal_cabinet')" />

      <div class="app-container">
        <div class="text-lg font-medium text-center py-5 tracking-wide">
          {{ $t("Welcome") }}
        </div>

        <q-form ref="formRef">
          <div class="label">{{ $t("Phone_number") }}</div>
          <BaseInput type="tel" prepend v-model="phone" mask="## ### ## ##">
            <template #prepend>
              <div class="phone_prefix">{{ PHONE_PREFIX }}</div>
            </template>
          </BaseInput>

          <q-btn
            class="full-width mt-6"
            color="primary"
            no-caps
            @click="tryLogin"
            :label="$t('Continue')"
          />
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
import BackPanel from "src/components/BackPanel.vue";
import BaseInput from "src/components/UI/BaseInput.vue";
import { PHONE_PREFIX } from "src/utils/helpers";
import { ref } from "vue-demi";

const phone = ref("");
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
