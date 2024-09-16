import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getServerError } from 'src/utils/helpers'
import { useUserStore } from 'src/stores/user'
import { Notify } from 'quasar'
import { getAccessToken, getLocale } from 'src/utils/auth'

const api = axios.create({ baseURL: process.env.BASE_URL })

export default boot(({ app, route, router, store }) => {
    const userStore = useUserStore()
    api.interceptors.request.use(
        (config) => {
            const token = getAccessToken()

            if (token) config.headers.Authorization = 'Bearer ' + token

            let lang = getLocale()

            if (lang?.startsWith('uz')) lang = 'uz'
            if (lang == 'qr') lang = 'kr'

            if (lang) config.headers['lang'] = lang

            // config.headers['Access-Control-Allow-Origin'] = '*'
            // config.headers['Access-Control-Allow-Credentials'] = true
            // config.headers['Access-Control-Allow-Methods'] =
            //     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

            return config
        },
        (error) => Promise.reject(error),
    )

    api.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            let message = getServerError(error, 'errorMessage')
            const originalRequest = error.config
            const status = error?.response?.status

            if ('pass' in error?.config) {
                return Promise.reject(error)
            }

            if (status === 401 && !originalRequest._retry) {
                console.log('status', status)
                console.log('hi')

                originalRequest._retry = true
                try {
                    // const refreshToken = useUserStore().refreshToken
                    await useUserStore().handleRefreshAccessToken()

                    originalRequest.headers.Authorization = `Bearer ${useUserStore().accessToken}`
                    return api(originalRequest)
                } catch (refreshError) {
                    console.log('refreshError', refreshError)

                    useUserStore().logoutProfile()
                    router.push({ name: 'login' })
                    return Promise.reject(refreshError)
                }
            } else if (status?.toString()?.slice(0, 1) === 5) {
                message = 'Internal Server Error'
            } else if (status === 405) {
                message = 'Method Not Allowed'
            } else if (status === 404) {
                message = 'Not Found'
            } else if (status === 403) {
                message = '403 Forbidden'
            } else {
                message =
                    message ?? 'Error 500. Backendda nomalum xatolik yuz berdi!'
            }
            // if (message) {
            //     Notify.create({
            //         progress: true,
            //         position: 'top',
            //         message,
            //         type: 'info',
            //         color: 'negative',
            //         timeout: 4000,
            //     })
            // }
            return Promise.reject(error)
        },
    )
})

export { api }
