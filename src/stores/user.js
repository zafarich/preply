import * as api from 'src/api/user'
import { defineStore } from 'pinia'

import { ref, computed } from 'vue-demi'
import { useLangStore } from './lang.store'
import {
    getTokenFromCache,
    removeTokenFromCache,
    setTokenToCache,
} from 'src/utils/auth'

export const useUserStore = defineStore(
    'user',

    () => {
        const token = ref(getTokenFromCache())
        const userCards = ref([])
        const userData = ref({})
        const leaders = ref({
            results: [],
        })

        const everyDay = ref('222')

        const page_size = 10

        const userVerifyCards = computed(() => {
            return userCards.value.filter((item) => item.verify === true)
        })

        function setUserData(data) {
            userData.value = data
        }

        function updateUserData(payload) {
            const newUserData = { ...userData.value, ...payload }
            userData.value = { ...newUserData }
        }

        async function getLeaders(params) {
            const res = await api.getLeaders({
                ...params,
                page_size: page_size,
            })
            // leaders.value = res
            return res
        }
        async function login(payload) {
            const res = await api.login(payload)
            if (res && res.access) {
                setTokenToCache(res.access)
                token.value = res.access
            }

            console.log('hi', res.access)

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
            updateUserData(res)

            return res
        }

        async function logoutProfile() {
            userData.value = {}
            token.value = ''
            removeTokenFromCache()
            userCards.value = []
            leaders.value = {
                results: [],
            }
        }

        function sayhay() {
            console.log('sayHay')
        }
        return {
            userData,
            everyDay,
            token,
            userCards,
            page_size,
            leaders,
            userVerifyCards,
            login,
            getLeaders,
            updateUser,
            setUserData,
            updateUserData,
            sayhay,
            getMe,
            register,
            logoutProfile,
        }
    },
    {
        persist: true,
    },
)
