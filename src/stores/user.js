import * as api from 'src/api/user'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref, computed } from 'vue-demi'
import { getTokenFromCache, setTokenToCache } from 'src/utils/auth'
import { useLangStore } from './lang.store'

export const useUserStore = defineStore('user', () => {
    const token = ref(getTokenFromCache())
    const isAuth = computed(() => !!token.value)
    const all_count = ref(0)
    const userCards = ref([])
    const userData = ref(LocalStorage.getItem('userData') || {})
    const leaders = ref({
        results: [],
    })

    const page_size = 10

    const userVerifyCards = computed(() => {
        return userCards.value.filter((item) => item.verify === true)
    })

    function setUserData(data) {
        userData.value = data
        LocalStorage.set('userData', data)
    }

    function removeUserData(data) {
        userData.value = {}
        LocalStorage.set('userData', {})
    }

    function updateUserData(payload) {
        const newUserData = { ...userData.value, ...payload }
        userData.value = { ...newUserData }
        LocalStorage.set('userData', userData.value)
    }

    async function getLeaders(params) {
        const res = await api.getLeaders({ ...params, page_size: page_size })
        leaders.value = res
        return res
    }
    async function login(payload) {
        const res = await api.login(payload)
        if (res && res.access) {
            setTokenToCache(res.access)
        }

        const res2 = await getMe()

        useLangStore().setLanguage(res2.language)
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
        userVerifyCards,
        page_size,
    }
})
