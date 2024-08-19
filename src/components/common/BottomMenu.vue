<template>
    <div class="bottom-menu">
        <q-btn
            exact="link"
            :to="{ name: 'home' }"
            :color="route_name_start === 'home' ? 'primary' : ''"
            flat
            icon="eva-home-outline"
            no-caps
            :label="$t('main')"
        />
        <q-btn
            :to="{ name: 'tests' }"
            :color="route_name_start === 'tests' ? 'primary' : ''"
            flat
            icon="eva-layers-outline"
            no-caps
            :label="$t('tests')"
        />
        <!-- <q-btn flat icon="eva-plus-circle-outline" no-caps label="Asosiy" /> -->
        <q-btn
            :to="{ name: 'leaders' }"
            :color="route_name_start === 'leaders' ? 'primary' : ''"
            flat
            icon="eva-bar-chart-outline"
            no-caps
            :label="$t('leaders')"
            @click="() => console.log('hello')"
        />
        <q-btn
            class="relative flex flex-col"
            :to="{ name: 'profile' }"
            :color="route_name_start === 'profile' ? 'primary' : ''"
            flat
            no-caps
        >
            <q-icon name="eva-person-outline" />
            <div>
                {{ $t('profile') }}
            </div>
            <!-- <img
                src="/icons/user-check.png"
                class="h-6 w-6 absolute top-0 right-0"
            /> -->
        </q-btn>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

const route_name_start = computed(() => {
    return route.name.split('.')?.[0]
})
</script>
<style lang="scss">
.bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    background-color: 100%;
    width: 100%;
    border-top: 1px solid $gray-5;
    display: flex;
    background-color: #fff;
    .q-btn {
        width: 25% !important;
        padding-top: 8px !important;
        padding-bottom: 4px !important;
        border-radius: 0px !important;
        font-size: 12px;
        display: block;
        & > i,
        & > span {
            display: block;
        }
        .q-icon {
            margin-right: 0px !important;
        }
    }
    .q-btn-group {
        border: none !important;
    }
}
</style>
