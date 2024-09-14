<template>
    <div>
        <div class="text-bold mt-6 mb-6 text-xl text-center">
            {{ $t('leaders') }}
        </div>

        <q-btn class="w-full mb-4 py-3" color="blue" no-caps @click="sharePage">
            <span class="text-lg mr-2"> {{ $t('share_with_others') }}</span>
            <q-icon name="eva-share-outline" color="white" size="sm" />
        </q-btn>

        <div class="flex justify-between mb-4 gap-2">
            <q-btn
                class="mb-3 grow"
                v-for="(item, index) in DAILY_FILTERS"
                :key="index"
                :outline="by_time !== item.value"
                @click="filterByTime(item.value)"
                color="primary"
                no-caps
                :label="$t(item.label)"
            />
        </div>

        <div class="grid grid-cols-1 gap-4 mb-4">
            <BaseSelect
                v-model="region"
                outlined
                placeholder="Hudud"
                emit-value
                map-options
                :options="referenceStore.regions"
                option-label="title"
                option-value="id"
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
        <div
            ref="contentToCapture"
            v-if="usersStore.leaders.results.length > 0"
        >
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

<script setup>
import { ref } from 'vue-demi'
import BaseSelect from 'src/components/UI/BaseSelect.vue'
import LeaderTable from 'src/components/LeaderTable.vue'
import { useUserStore } from 'src/stores/user'
import { useReferencesStore } from 'src/stores/references'
import { onMounted, watch } from 'vue'
import { useMainStore } from 'src/stores/main'
import { LEADERS_FILTER_TIME } from 'src/utils/constants'
import { useRoute, useRouter } from 'vue-router'

const contentToCapture = ref(null)

const region = ref('')
const science = ref('')
const page = ref(1)
const by_time = ref('all')

const DAILY_FILTERS = [
    {
        value: LEADERS_FILTER_TIME.ALL,
        label: 'All',
    },
    {
        value: LEADERS_FILTER_TIME.DAILY,
        label: 'daily',
    },
    {
        value: LEADERS_FILTER_TIME.WEEKLY,
        label: 'weekly',
    },
    {
        value: LEADERS_FILTER_TIME.MONTHLY,
        label: 'monthly',
    },
]

const usersStore = useUserStore()
const referenceStore = useReferencesStore()
const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    mainStore.changeSiteLoader(true)
    await Promise.allSettled([
        referenceStore.getRegions(),
        referenceStore.getParentSubjects({ is_main_for_block: true }),
        fetchLeaders(),
    ])

    const route = useRoute()

    if (route.page) {
        page.value = route.page
    }
    if (route.science) {
        science.value = route.science
    }
    if (route.region) {
        region.value = route.region
    }
    if (route.by_time) {
        by_time.value = route.by_time
    }

    mainStore.changeSiteLoader(false)
})

watch(
    () => region.value + science.value + by_time.value,
    async () => {
        page.value = 1

        replaceQuery()

        await fetchLeaders()
    },
)

const replaceQuery = () => {
    const queryFilters = {
        page: page.value,
        region: region.value,
        science: science.value,
        by_time: by_time.value,
    }

    router.replace({ query: { ...queryFilters } })
}

const fetchLeaders = async () => {
    mainStore.changeSiteLoader(true)
    await usersStore.getLeaders({
        page: page.value,
        region: region.value,
        science: science.value,
        by_time: by_time.value,
    })
    mainStore.changeSiteLoader(false)
}

const filterByTime = async (value) => {
    by_time.value = value
    await fetchLeaders()
}
const sharePage = async () => {
    // t.me/exbmba_bot?start=getCommand-forward=?next=/leaders?region=1
    //  const page = 'leaders'
    //const url = `https://t.me/exbmba?start=getCommand-forward=${page}&next=leaders`
    const url =
        'https://t.me/exbmba?start=getCommand-forward=&next-page=leaders&page-number=page&by-time=time&science=science&region=region'
    if (window.Telegram && window.Telegram.WebApp) {
        // Inside Telegram Mini App: Use Telegram WebApp API
        window.Telegram.WebApp.openLink(url)
    } else {
        // Outside Telegram (Web): Use regular URL redirect
        window.location.href = url
    }
}
</script>

<style lang="scss">
#lang-switcher {
    .q-icon {
        display: none !important;
    }
}
</style>
