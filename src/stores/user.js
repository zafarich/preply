import * as api from 'src/api/user'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref, computed } from 'vue-demi'
import { getTokenFromCache, setTokenToCache } from 'src/utils/auth'
import { useMainStore } from './main'

export const useUserStore = defineStore('user', () => {
    const token = ref(getTokenFromCache())
    const isAuth = computed(() => !!token.value)
    const all_count = ref(0)
    const userCards = ref([])
    const userData = ref(LocalStorage.getItem('userData') || {})
    const leaders = ref({
        results: [],
    })

    function setUserData(data) {
        console.log('setUserData')
        userData.value = data
        LocalStorage.set('userData', data)
    }

    function removeUserData(data) {
        userData.value = {}
        LocalStorage.set('userData', {})
    }

    function updateUserData(payload) {
        console.log('updateUserData')
        const newUserData = { ...userData.value, ...payload }
        userData.value = { ...newUserData }
        LocalStorage.set('userData', userData.value)
    }

    async function getLeaders(params) {
        const res = await api.getLeaders({ ...params, page_size: 10 })
        leaders.value = res
        return res
    }
    async function login(payload) {
        const res = await api.login(payload)
        console.log('res', res.access)
        if (res && res.access) {
            setTokenToCache(res.access)
        }

        const res2 = await getMe()
        console.log('res', res2)

        useMainStore().setLanguage(res2.language)
        updateUserData(res2)

        return res
    }

    async function register(payload) {
        const res = await api.register(payload)
        return res
    }

    async function updateUser(data) {
        const res = await api.updateUser(userData.value.id, data)
        const res2 = await getMe()

        updateUserData(res2)
    }

    async function getMe() {
        const res = await api.getMe()
        userCards.value = [...res.cards]
        // userData.value = [...res]
        return res
    }

    return {
        getLeaders,
        login,
        updateUser,
        userData,
        setUserData,
        removeUserData,
        updateUserData,
        getMe,
        userCards,
        leaders,
        isAuth,
        register,
    }
})
