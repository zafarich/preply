import * as api from 'src/api/main'
import { i18n } from 'src/boot/i18n'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue-demi'
import languages from 'quasar/lang/index.json'
import { Quasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { getLocale } from 'src/utils/auth'
const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs')

export const useLangStore = defineStore('language', () => {
    const baseURL = process.env.API || ''
    const availableLangs = ['ru', 'uz-Latn', 'qr']
    let appLanguages = languages.filter((lang) =>
        availableLangs.includes(lang.isoName),
    )
    appLanguages = [
        ...appLanguages,
        {
            isoName: 'qr',
            nativeName: 'Qoraqalpoqcha',
        },
    ]
    const defaultLangOptions = [
        {
            value: 'ru',
            label: 'Русский',
            shortName: 'Рус',
            icon: '/images/lang/ru.png',
        },
        {
            value: 'uz-Latn',
            label: "O'zbekcha",
            shortName: "O'zb",
            icon: '/images/lang/uz.png',
        },
        {
            value: 'qr',
            label: 'Qoraqalpoqcha',
            shortName: 'QR',
            icon: '/images/lang/qr.png',
        },
    ]

    const langOptions = []

    appLanguages.forEach((lang) => {
        const res = defaultLangOptions.find((l) => l.value === lang.isoName)
        if (res) {
            langOptions.push({
                nativeName: lang.nativeName,
                ...res,
            })
        }
    })

    const { locale } = useI18n()

    const availableLocales = computed(() => {
        return langOptions.filter((v) => v.value !== locale.value)
    })
    const currentLocale = computed(() => {
        return langOptions.find((v) => v.value === locale.value) || {}
    })

    async function setLanguage(val = null) {
        const navigatorLang = navigator.language.split('-')[0]

        let lang = val || getLocale() || navigatorLang

        lang = availableLangs.find((v) => v.startsWith(lang))

        !lang && (lang = 'ru')

        try {
            langList[`../../node_modules/quasar/lang/${lang}.mjs`]().then(
                (lang) => {
                    Quasar.lang.set(lang.default)
                },
            )
        } catch (err) {}

        i18n.global.locale.value = lang
    }

    return {
        baseURL,
        setLanguage,
        availableLocales,
        currentLocale,
    }
})
