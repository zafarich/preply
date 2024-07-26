<template>
    <div class="bg-[#333] py-4 app-container text-white">
        <img src="/images/logo_s_1.png" alt="" class="h-10 mb-10" />

        <div class="flex justify-between items-center py-3 border-b">
            <div>Возник вопрос? Звоните</div>
            <div class="flex justify-start items-center gap-2">
                <q-icon name="eva-phone-outline" color="" size="md" />
                +998 88 888 88 88
            </div>
        </div>

        <div
            class="py-3 flex justify-between items-center border-b cursor-pointer"
            @click="toAboutUs"
        >
            О нас
        </div>
        <div
            class="py-3 flex justify-between items-center border-b cursor-pointer"
            @click="toContactUs"
        >
            Для сотрудничества с нами
        </div>

        <div
            class="py-3 flex justify-between items-center border-b cursor-pointer"
            @click="toVacancies"
        >
            Вакансии
        </div>

        <div class="py-3 flex justify-between items-center border-b">
            <div>Мы принимаем к оплате</div>
            <div class="flex justify-center items-center">
                <span class="border rounded-lg mr-2">
                    <img src="images/icons/humo.svg" />
                </span>
                <span class="border rounded-lg">
                    <img src="images/icons/uzcard.svg" />
                </span>
            </div>
        </div>

        <div class="py-3 flex gap-4 justify-center items-center">
            <img
                src="/icons/instagram.png"
                alt=""
                class="h-8 mb-8 cursor-pointer"
            />
            <img
                src="/icons/telegram.png"
                alt=""
                class="h-8 mb-8 cursor-pointer"
            />
            <img
                src="/icons/youtube.png"
                alt=""
                class="h-8 mb-8 cursor-pointer"
            />
            <img
                src="/icons/facebook.png"
                alt=""
                class="h-8 mb-8 cursor-pointer"
            />
        </div>

        <div class="text-center text-sm py-3">
            ©2024 EXBMBA, Barcha huquqlar himoyalangan.
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toAboutUs = () => {
    router.push({ name: 'about-us' })
}
const toContactUs = () => {
    router.push({ name: 'contact-us' })
}
const toVacancies = () => {
    router.push({ name: 'vacancy' })
}
</script>
