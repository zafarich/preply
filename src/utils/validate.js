import { i18n } from 'src/boot/i18n'
const { t } = i18n.global
import { trimBetween } from './helpers'

export const regExp = {
    password: /^[\w.!@#$%^&*=-|\/]{6,}$/,
    string: /^[a-zA-Zа-яА-Я]/,
    latin: /^[a-zA-Z]/,
    number: /^[0-9.]*$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/,
}

export default {
    required: (v) => !!trimBetween(v) || t('rules.required'),
    phone_number: (v) => trimBetween(v)?.length === 9 || t('rules.phone'),
    number: (v) =>
        !v ||
        regExp.number.test(Math.abs(trimBetween(v))) ||
        t('rules.integer'),
    integer: (v) =>
        !v || Number(v) === parseInt(trimBetween(v)) || t('rules.integer'),
    float: (v) =>
        !v || Number(v) === parseFloat(trimBetween(v)) || t('rules.float'),
    email: (v) => regExp.email.test(v) || t('rules.email'),
    positive: (v) => Number(trimBetween(v)) >= 0 || t('rules.positive'),
    min_string: (v, n) =>
        trimBetween(v).toString().length >= n || t('rules.min_string', { n }),
    max_string: (v, n) =>
        trimBetween(v).toString().length <= n || t('rules.max_string', { n }),
    max100: (v) => Number(trimBetween(v)) <= 100 || t('rules.max', { n: 100 }),
    date: (v) => (v ? regExp.date.test(v) || t('rules.date') : true),
    time: (v) => regExp.time.test(v),
    string: (v) => regExp.string.test(v) || t('rules.string'),
    fulltime: (v) => regExp.fulltime.test(v),
    timeOrFulltime: (v) => regExp.timeOrFulltime.test(v),
    password: (v) => regExp.password.test(v) || t('rules.password'),
    passwordConfirm: (v, originalPassword) =>
        v === originalPassword || t('rules.passwordConfirm'),
    latin: (v) => regExp.latin.test,
    latin: (v) => regExp.latin.test(v) || t('rules.latin'),
    tag: (v) => !regExp.tag.test(v) || t('rules.tag'),
    unique: (data, v, fieldName) => {
        const res = data.filter((el) => el[fieldName] === v)
        return res?.length === 1 || t('rules.unique')
    },
}
