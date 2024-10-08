import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { getLocale } from 'src/utils/auth'

function customRule(choice, choicesLength) {
    if (choice === 0) return 0

    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1
    if (!teen && endsWithOne) return 1
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2

    return choicesLength < 4 ? 2 : 3
}

const storedLocale = getLocale()

const i18n = createI18n({
    globalInjection: true,
    locale: storedLocale || 'uz-Latn',
    fallbackLocale: storedLocale || 'uz-Latn',
    legacy: false,
    messages,
})

export { i18n }
export default boot(({ app }) => {
    app.use(i18n)
})
