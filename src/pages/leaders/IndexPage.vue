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
                :placeholder="$t('province')"
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
import html2canvas from 'html2canvas'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t: $translate } = useI18n()
const contentToCapture = ref(null)
const $q = useQuasar()

const region = ref('')
const district = ref('')
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
        by_time: by_time.value,
    })
}

const filterByTime = async (value) => {
    by_time.value = value
    await fetchLeaders()
}
const sharePage = async () => {
    try {
        if (contentToCapture.value) {
            const canvas = await html2canvas(contentToCapture.value)
            const imageUrl = canvas.toDataURL('image/png')

            // Convert the data URL to a Blob
            const blob = await (await fetch(imageUrl)).blob()
            const formData = new FormData()
            formData.append('image', blob)

            // Upload the image to Imgur
            const response = await axios.post(
                'https://api.imgur.com/3/image',
                formData,
                {
                    headers: {
                        Authorization: '003f7b9cc422411',
                    },
                },
            )

            if (response.data.success) {
                const imgurUrl = response.data.data.link
                const telegramUrl = `https://telegram.me/share/url?url=${encodeURIComponent(imgurUrl)}&text=${encodeURIComponent('Check out this screenshot!')}`

                // Open the Telegram share URL in a new window/tab
                window.open(telegramUrl, '_blank')
            } else {
                console.error('Failed to upload image to Imgur')
            }
        }
    } catch (error) {
        console.error('Error capturing screenshot or uploading image:', error)
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            position: 'top',
            icon: 'warning',
            message: $translate('try_again_later'),
        })
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
