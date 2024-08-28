import { getAccessToken } from 'src/utils/auth'

// src/middlewares/auth.js
export default function auth({ next, store }) {
    const isLoggedIn = !!getAccessToken() // Replace with your actual login check
    if (!isLoggedIn) {
        return next({ path: '/auth/login' })
    }
    return next()
}
