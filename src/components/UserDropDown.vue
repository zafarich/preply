<template>
    <div class="dropdown" ref="dropdownRef">
        <!-- Label is an image -->
        <img
            :src="userStore.userData.image"
            alt="dropdown label"
            class="dropdown-label"
            @click="toggleDropdown"
            v-if="userStore.userData.image"
        />

        <img
            v-else
            src="/icons/user-icon.svg"
            alt="dropdown label"
            class="dropdown-label"
            @click="toggleDropdown"
        />

        <!-- Dropdown content -->
        <q-list bordered separator v-if="isOpen" class="dropdown-content">
            <q-item clickable class="dropdown-item" @click="goToProfile">
                <div>{{ $t('profile') }}</div>
                <q-icon name="eva-person-outline" size="sm" color="primary" />
            </q-item>
            <q-item clickable class="dropdown-item" @click="goToSubscriptions">
                <div>Prime</div>
                <div>
                    <q-badge
                        v-if="userStore.userData.is_prime"
                        color="primary"
                        no-caps
                        class="py-2"
                    >
                        {{ userStore.userData.prime_expiration_date }}
                    </q-badge>
                    <q-badge class="py-2" v-else color="red" no-caps>
                        mavjud emas
                    </q-badge>
                </div>
            </q-item>
            <q-item clickable class="dropdown-item" @click="goToSubscriptions">
                <div>Premium</div>
                <q-badge
                    class="py-2"
                    v-if="userStore.userData.is_premium"
                    color="primary"
                    no-caps
                >
                    <span v-if="userStore.userData.is_premium === true">
                        <img src="/icons/infinity.png" class="w-3.5" />
                    </span>

                    <span v-else> {{ userStore.userData.is_premium }} ta </span>
                </q-badge>
                <q-badge class="py-2" v-else color="red" no-caps>
                    mavjud emas
                </q-badge>
            </q-item>
            <q-item
                clickable
                class="dropdown-item text-[#c10015] flex justify-between items-center"
                @click="() => (logoutModal = true)"
            >
                <div>{{ $t('exit') }}</div>

                <div>
                    <img src="/icons/logout.png" class="w-5 h-5" />
                </div>
            </q-item>
        </q-list>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'
import { useModalStore } from 'src/stores/modal'
import { useUserStore } from 'src/stores/user'
import { PROFILE_TABS } from 'src/utils/constants'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const modalStore = useModalStore()
const router = useRouter()
const mainStore = useMainStore()

const { logoutModal } = storeToRefs(modalStore)
const { profileTab } = storeToRefs(mainStore)

const isOpen = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
    isOpen.value = !isOpen.value
}
function goToProfile() {
    profileTab.value = PROFILE_TABS.MY_DATA

    closeDropdown()
    router.push({ name: 'profile' })
}

function goToSubscriptions() {
    profileTab.value = PROFILE_TABS.MY_SUBSCRIPTIONS

    closeDropdown()
    router.push({ name: 'profile' })
}

function closeDropdown() {
    isOpen.value = false
}

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin-left: 20px;
}

.dropdown-label {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #4f9e91;
}

.dropdown-content {
    display: block;
    width: 220px;
    position: absolute;
    left: -520%; /* Align to the left of the dropdown container */
    box-shadow:
        0 1px 5px rgba(0, 0, 0, 0.2),
        0 2px 2px rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12);
    background: #fff;
    z-index: 1;
    .dropdown-item {
        padding: 6px 8px;
        font-weight: 500;
        cursor: pointer;
        display: flex !important;
        justify-content: space-between;
        align-items: center;
    }
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}
</style>
