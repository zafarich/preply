import * as api from 'src/api/user'
import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue-demi'

export const useUserStore = defineStore('user', () => {
    const all_count = ref(0)

    const userData = ref(LocalStorage.getItem('userData') || {})

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
        return res?.results
    }
    async function login(payload) {
        const res = await api.login(payload)
        return res
    }

    async function updateUser(data) {
        const res = await api.updateUser(userData.value.id, data)
        console.log('datapass', res)
        updateUserData(data)
    }

    return {
        getLeaders,
        login,
        updateUser,
        userData,
        setUserData,
        removeUserData,
        updateUserData,
    }
})
