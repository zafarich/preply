<script setup>
import { ref } from 'vue-demi'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import LeaderTable from 'src/components/LeaderTable.vue'
import { useUserStore } from 'src/stores/user'
import { useReferencesStore } from 'src/stores/references'
import { onMounted, watch } from 'vue'

const region = ref('')
const district = ref('')
const science = ref('')
const page = ref(1)
const usersStore = useUserStore()
const referenceStore = useReferencesStore()

onMounted(async () => {
    await referenceStore.getRegions()
    await referenceStore.getSubjects({ is_main_for_block: true })
    await fetchLeaders()
})

watch(
    () => region.value + science.value + district.value,
    async () => {
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
            <div><q-btn color="primary" no-caps label="Kunlik" /></div>
            <div>
                <q-btn outline color="primary" no-caps label="Haftalik" />
            </div>
            <div><q-btn outline color="primary" no-caps label="Oylik" /></div>
            <div><q-btn outline color="primary" no-caps label="Barcha" /></div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
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
            <BaseSelect
                outlined
                :placeholder="$t('district')"
                :options="[
                    'Toshkent',
                    'Buxoro',
                    'Qoraqalpog\'iston respublikasi',
                    'Andijon',
                ]"
            />
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
            <LeaderTable :items="usersStore.leaders.results" />

            <div class="flex justify-center my-5">
                <q-pagination
                    v-model="page"
                    @update:model-value="fetchLeaders"
                    :max="Math.ceil(usersStore.leaders.count / 10)"
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
