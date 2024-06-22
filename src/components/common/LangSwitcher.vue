<script setup>
import { useAttrs, ref } from 'vue-demi'
import { useLangStore } from 'stores/lang.store'
import BaseImg from 'components/UI/BaseImg.vue'
import { debounce } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { getTokenFromCache } from 'src/utils/auth'
import { useRouter } from 'vue-router'

const attrs = useAttrs()

const props = defineProps({
    openOnHover: {
        type: Boolean,
        default: true,
    },
    closeOnHover: {
        type: Boolean,
        default: true,
    },
})

const mainStore = useLangStore()
const userStore = useUserStore()

const router = useRouter()
const userMenu = ref(false)

const menuToggle = debounce((status) => {
    if (status) {
        if (props.openOnHover) userMenu.value = true
    } else {
        if (props.closeOnHover) userMenu.value = false
    }
}, 20)

const changeLang = async (lang) => {
    console.log('lang', lang)
    mainStore.setLanguage(lang)
    const language =
        lang === 'uz-Latn' ? 'uz' : lang === 'uz-Cyrl' ? 'kr' : 'ru'

    if (getTokenFromCache()) await userStore.updateUser({ language })

    router.go()
}
</script>

<template>
    <q-btn-dropdown
        v-model="userMenu"
        v-bind="attrs"
        text-color="black"
        dropdown-icon="keyboard_arrow_down"
        class="lang_switcher"
        content-class="lang_switcher-dropdown"
        no-caps
        :menu-offset="[0, 1]"
    >
        <template #label>
            <BaseImg
                :src="mainStore.currentLocale.icon"
                :alt="mainStore.currentLocale.value + '-locale-icon'"
                class="flag-icon"
                width="17px"
                height="17px"
            />
            <div class="title">
                {{ mainStore.currentLocale.shortName }}
            </div>
        </template>
        <q-list>
            <q-item
                v-for="(lang, idx) in mainStore.availableLocales"
                :key="idx"
                clickable
                v-close-popup
                @click="changeLang(lang.value)"
            >
                <q-item-section>
                    <q-item-label class="lang-item">
                        <BaseImg
                            :src="lang.icon"
                            :alt="lang.value + '-locale-icon'"
                            width="17px"
                            height="17px"
                            class="flag-icon"
                        />
                        {{ lang.label }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>

<style lang="scss">
.lang_switcher {
    padding: 3px 14px;
    padding-right: 10px;
    height: 38px;
    .flag-icon {
        margin-right: 10px;
    }
    .q-icon {
        color: $primary;
        margin-left: 5px;
    }
    &-dropdown {
        .flag-icon {
            margin-right: 10px;
        }
        .q-item {
            padding-top: 0;
            padding-bottom: 0;
            min-height: 38px;
            padding-left: 20px;
        }
        .lang-item {
            display: flex;
            align-items: center;
        }
    }
}
</style>
