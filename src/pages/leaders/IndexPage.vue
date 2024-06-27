<script setup>
import { ref } from 'vue-demi'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import LeaderTable from 'src/components/LeaderTable.vue'
import { useUserStore } from 'src/stores/user'
import { useReferencesStore } from 'src/stores/references'
import { onMounted, watch } from 'vue'
import { useMainStore } from 'src/stores/main'

const region = ref('')
const district = ref('')
const science = ref('')
const page = ref(1)

const usersStore = useUserStore()
const referenceStore = useReferencesStore()
const mainStore = useMainStore()

onMounted(async () => {
    mainStore.changeSiteLoader(true)
    await Promise.allSettled([
        referenceStore.getRegions(),
        referenceStore.getSubjects({ is_main_for_block: true }),
        fetchLeaders(),
    ])

    mainStore.changeSiteLoader(false)
})

watch(
    () => region.value + science.value + district.value,
    async () => {
        page.value = 1
        await fetchLeaders()
    },
)

const fetchLeaders = async () => {
    await usersStore.getLeaders({
        page: page.value,
        region: region.value,
        district: district.value,
    })
}
</script>
<template>
    <div>
        <div class="text-bold mt-6 mb-6 text-xl">{{ $t('leaders') }}</div>

        <div class="flex justify-between mb-4">
            <div class="mb-3">
                <q-btn color="primary" no-caps :label="$t('daily')" />
            </div>
            <div class="mb-3">
                <q-btn outline color="primary" no-caps :label="$t('weekly')" />
            </div>
            <div class="mb-3">
                <q-btn outline color="primary" no-caps :label="$t('monthly')" />
            </div>
            <div class="mb-3">
                <q-btn outline color="primary" no-caps :label="$t('All')" />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4 mb-4">
            <BaseSelect
                v-model="region"
                outlined
                :placeholder="$t('province')"
                emit-value
                map-options
                :options="referenceStore.regions"
                option-label="title"
                option-value="id"
            />
            <!-- v-model="district" -->
            <!-- <BaseSelect
                outlined
                :placeholder="$t('district')"
                :options="[
                    'Toshkent',
                    'Buxoro',
                    'Qoraqalpog\'iston respublikasi',
                    'Andijon',
                ]"
            /> -->
        </div>

        <div class="mb-6">
            <BaseSelect
                v-model="science"
                outlined
                :placeholder="$t('subject')"
                :options="referenceStore.main_subjects"
                emit-value
                map-options
                option-label="title"
                option-value="id"
            />
        </div>
        <div v-if="usersStore.leaders.results.length > 0">
            <LeaderTable
                :items="usersStore.leaders.results"
                :page="page"
                :page_size="usersStore.page_size"
            />

            <div class="flex justify-center my-5">
                <q-pagination
                    v-model="page"
                    @update:model-value="fetchLeaders"
                    :max="
                        Math.ceil(
                            usersStore.leaders.count / usersStore.page_size,
                        )
                    "
                    :max-pages="10"
                    boundary-numbers
                    direction-links
                    class="base-pagination"
                    icon-prev="img:/images/icons/chevron_left_16.svg"
                    icon-next="img:/images/icons/chevron_right_16.svg"
                />
            </div>
        </div>
        <div v-else class="text-center font-semibold text-base text-gray-400">
            {{ $t('not_data') }}
        </div>
    </div>
</template>

<style></style>
