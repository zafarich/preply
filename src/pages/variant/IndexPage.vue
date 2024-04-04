<script setup>
import { computed, onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

import BaseModal from "src/components/UI/BaseModal.vue";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const $q = useQuasar();

import { useReferencesStore } from "src/stores/references";
import { useTestStore } from "src/stores/test";

const referencesStore = useReferencesStore();
const testStore = useTestStore();

const subject_id = route.params.id;
const subject = ref(null);

const notice_test_modal = ref(false);

const variants = ref([]);
const selected_variant = ref(null);

onMounted(() => {
  fetchSubject();
  fetchVariants();
});

async function fetchVariants() {
  variants.value = await testStore.getVariants({
    page: 1,
    subject: subject_id,
  });

  console.log("variants.value", variants.value);
}

async function fetchSubject() {
  subject.value = await referencesStore.getSubjectById(subject_id);
}
function close() {
  notice_test_modal.value = false;
}
function goToSolveTest(variant) {
  selected_variant.value = variant?.id;
  notice_test_modal.value = true;
}

async function startTest() {
  if (selected_variant.value) {
    $q.loading.show();
    await testStore.startTest({ variant_id: selected_variant.value });

    testStore.changeTestField({
      type: "single",
      variant_id: selected_variant.value,
    });
    $q.loading.hide();

    router.push({
      name: "tests.solving",
      query: { s1: selected_variant.value },
    });
  }
}
</script>
<template>
  <div>
    <div class="flex items-center mb-6 mt-5">
      <router-link :to="{ name: 'tests' }" class="mr-6"
        ><q-icon size="24px" name="keyboard_backspace"
      /></router-link>
      <div class="text-bold text-xl">{{ subject?.title }}</div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        @click="goToSolveTest(variant)"
        class="variant-item"
        v-for="variant in variants"
        :key="variant.id"
      >
        {{ variant.title }}
      </button>
    </div>

    <BaseModal
      :model-value="notice_test_modal"
      @close="close"
      class="warning-modal"
    >
      <div>
        <div class="row items-center q-pb-none">
          <div class="title-modal"></div>
          <q-space />
          <button class="close-modal_btn" v-close-popup>
            <img src="/images/icons/close-modal.png" alt="" />
          </button>
        </div>
        <div>
          <div class="mb-8">
            <div class="flex justify-center mb-5">
              <img src="/images/icons/warning_circle.png" alt="" />
            </div>

            <div class="font-semibold text-lg mb-2 text-center">Diqqat</div>
            <div class="font-medium mb-2 text-center">
              Test boshlangandan keyin uni yakunlamasdan boshqa amallarni bajara
              olmaysiz !
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              v-close-popup
              class="px-5 w-full h-10 text-base rounded-xl bg-f1f2f4"
            >
              Bekor qilish
            </button>
            <button
              @click="startTest"
              class="px-5 w-full h-10 text-base text-white rounded-xl bg-primary"
            >
              Boshlash
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<style lang="scss">
.variant-item {
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid $gray-6;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
