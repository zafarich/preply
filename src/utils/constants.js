import { info } from 'autoprefixer'

export const TEST_TYPES = {
    BLOCK: 'block',
    CERTIFICATE: 'certificate',
    VARIANT: 'variant',
    BY_SUBJECTS: 'by_subjects',
    BY_SELECTIONS: 'by_selections',
}

export const LEADERS_FILTER_TIME = {
    ALL: 'all',
    DAILY: 'per_day',
    WEEKLY: 'per_week',
    MONTHLY: 'per_month',
}

export const MAX_ATTEMTS_COUNT = 1000
export const ALLOWED_ATTEMTS = 3

export const TEST_ERROR_TYPES = {
    PRIME_SUBS_IS_NOT_EXIST: 'prime_status_is_not_exists',
    PREMIUM_SUBS_IS_NOT_EXIST: 'premium_subscribe_is_not_exists',
}

export const TEST_TYPE_LIST = [
    {
        key: 'block',
        text: 'Blok Test',
    },
    {
        key: 'certificate',
        text: 'Sertificate Test',
    },
    {
        key: 'variant',
        text: 'Variant Test',
    },
    {
        key: 'by_subjects',
        text: 'Fan Test',
    },
    {
        key: 'by_selections',
        text: 'Mavzulashtirilgan Test',
    },
]

export const ALL_TEST_TYPES = [
    {
        key: 'block',
        text: 'Blok Test',
    },
    {
        key: 'certificate',
        text: 'Sertificate Test',
    },
    {
        key: 'variant',
        text: 'Variant Test',
    },
    {
        key: 'by_subjects',
        text: 'Fan Test',
    },
    {
        key: 'by_selections',
        text: 'Mavzulashtirilgan Test',
    },
]

export const MANDATORY_SUBJECTS = [
    {
        label: 'math',
    },
    {
        label: 'history',
    },
    {
        label: 'mother_tongue',
    },
]

export const TARIFFS = {
    PRIME: {
        code: 'prime',
        label: 'prime_tests',
        info: 'prime_info',
        icon: '/icons/prime_icon.png',
        errorText: 'prime_status_is_not_exists',
    },
    PREMIUM: {
        code: 'premium',
        label: 'premium_tests',
        info: 'premium_info',
        icon: '/icons/premium.png',
        errorText: 'premium_subscribe_is_not_exists',
    },
}

export const PROFILE_TABS = {
    MY_DATA: 'my_data',
    MY_CARDS: 'my_cards',
    MY_SUBSCRIPTIONS: 'my_subscriptions',
    MY_RESULTS: 'my_results',
}
