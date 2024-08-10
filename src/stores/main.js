import { defineStore } from 'pinia'
import { TARIFFS } from 'src/utils/constants'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const siteLoader = ref(false)
    const selectedTariffInfo = ref(TARIFFS.PREMIUM.code)

    function changeSiteLoader(value) {
        siteLoader.value = value
    }

    function changeSelectedTariffInfo(value) {
        selectedTariffInfo.value = value
    }

    return {
        siteLoader,
        selectedTariffInfo,
        changeSiteLoader,
        changeSelectedTariffInfo,
    }
})
