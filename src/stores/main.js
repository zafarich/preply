import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
    const siteLoader = ref(false)

    function changeSiteLoader(value) {
        siteLoader.value = value
    }

    return {
        siteLoader,
        changeSiteLoader,
    }
})
