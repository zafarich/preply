import * as api from 'src/api/user'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { ref, computed } from 'vue-demi'
import { useLangStore } from './lang.store'
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
} from 'src/utils/auth'

export const useUserStore = defineStore(
    'user',

    () => {
        const accessToken = ref(getAccessToken())
        const refreshToken = ref(getRefreshToken())

        const userCards = ref([])
        const userData = ref({})
        const leaders = ref({
            results: [],
        })

        const page_size = 10

        const getAccessTokenData = computed(() => {
            return jwtDecode(accessToken.value)
        })

        const getRefreshTokenData = computed(() => {
            return jwtDecode(refreshToken.value)
        })

        const isAccessTokenExpire = computed(() => {
            const currentTime = Math.floor(Date.now() / 1000)
            if (currentTime >= getAccessTokenData.value.exp) {
                return true
            }

            return false
        })

        const isRefreshTokenExpire = computed(() => {
            const currentTime = Math.floor(Date.now() / 1000)
            if (currentTime >= getRefreshToken.value.exp) {
                return true
            }

            return false
        })

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
            leaders.value = res
            return res
        }
        async function login(payload) {
            const res = await api.login(payload)
            if (res && res.access) {
                setAccessToken(res.access)
                setRefreshToken(res.refresh)
                accessToken.value = res.access
                refreshToken.value = res.refresh
            }

            const res2 = await getMe()

            useLangStore().setLanguage(res2.language)
            updateUserData(res2)

            return res
        }

        async function handleRefreshAccessToken() {
            const res = await api.refreshAccessToken(refreshToken.value)
            if (res && res.access) {
                setAccessToken(res.access)
                setRefreshToken(res.refresh)
                accessToken.value = res.access
                refreshToken.value = res.refresh
            }

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
            accessToken.value = ''
            refreshToken.value = ''
            removeAccessToken()
            removeRefreshToken()
            userCards.value = []
            leaders.value = {
                results: [],
            }
        }

        return {
            userData,
            userCards,
            accessToken,
            refreshToken,
            page_size,
            leaders,
            userVerifyCards,
            accessToken,
            refreshToken,

            getRefreshTokenData,
            getAccessTokenData,
            isAccessTokenExpire,
            isRefreshTokenExpire,

            login,
            getLeaders,
            updateUser,
            setUserData,
            updateUserData,
            getMe,
            register,
            logoutProfile,
            handleRefreshAccessToken,
        }
    },
    {
        persist: true,
    },
)
