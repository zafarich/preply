import { defineStore } from 'pinia'
import { PROFILE_TABS, TARIFFS } from 'src/utils/constants'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const siteLoader = ref(false)
    const selectedTariffInfo = ref(TARIFFS.PREMIUM.code)
    const profileTab = ref(PROFILE_TABS.MY_DATA)
    const showFireWorks = ref(false)

    function changeSiteLoader(value) {
        siteLoader.value = value
    }

    function changeSelectedTariffInfo(value) {
        selectedTariffInfo.value = value
    }

    function changeFireWorks(value) {
        showFireWorks.value = value
    }

    return {
        siteLoader,
        profileTab,
        selectedTariffInfo,
        showFireWorks,
        changeSiteLoader,
        changeFireWorks,
        changeSelectedTariffInfo,
    }
})
