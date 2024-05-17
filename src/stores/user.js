import * as api from 'src/api/user'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue-demi'

export const useUserStore = defineStore('user', () => {
    const all_count = ref(0)
    const userCards = ref([])
    const userData = ref(LocalStorage.getItem('userData') || {})
    const leaders = ref({
        results: [],
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
        const res = await api.getLeaders(params)
        leaders.value = res
        return res
    }
    async function login(payload) {
        const res = await api.login(payload)
        return res
    }

    async function updateUser(data) {
        const res = await api.updateUser(userData.value.id, data)
        updateUserData(data)
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
    }
})
