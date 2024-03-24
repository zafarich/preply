<script setup>
import { onMounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import Banner from "./sections/Banner.vue";
import PopularScience from "./sections/PopularScience.vue";
import LeadersList from "./sections/LeadersList.vue";
const { t } = useI18n();

import { useReferencesStore } from "src/stores/references";

const referencesStore = useReferencesStore();

const subjects = ref([]);
const banners = ref([]);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  subjects.value = await referencesStore.getSubjects({ page: 1 });
  banners.value = await referencesStore.getBanners();

  console.log("subjects.value", subjects.value);
}
</script>
<template>
  <div>
    <div class="mb-8">
      <Banner :banners="banners" />
    </div>

    <div class="mb-8">
      <q-btn
        icon="app_registration"
        no-caps
        color="primary"
        class="block-test-btn w-full"
        :to="{ name: 'block' }"
      >
        Blok test yechish
      </q-btn>
    </div>

    <div class="mb-8">
      <PopularScience :subjects="subjects" />
    </div>
    <div class="">
      <LeadersList />
    </div>
  </div>
</template>

<style lang="scss">
.block-test-btn {
  height: 48px;
  letter-spacing: 0.5px;
  .q-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .q-btn__content {
    display: flex;
    align-items: center;
    // font-size: 16px;
  }
}
</style>
