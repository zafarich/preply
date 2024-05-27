<script setup>
import BaseImg from 'src/components/UI/BaseImg.vue'

const props = defineProps({
    subjects: {
        type: Array,
        default: () => [
            {
                title: 'IELTS',
                image: 'ielts.png',
            },
            {
                title: 'TOEFL',
                image: 'toefl.png',
            },
            {
                title: 'CEFR',
                image: 'cefr.png',
            },
        ],
    },
})
</script>
<template>
    <div class="grid grid-cols-3 gap-4">
        <router-link
            v-for="subject in subjects"
            :key="subject.title"
            :to="{ name: 'variant', params: { id: 2 } }"
            class="tests-item"
        >
            <div class="flex justify-center">
                <BaseImg
                    width="70px"
                    height="70px"
                    :src="`/images/tests/${subject.image}`"
                />
            </div>
        </router-link>
    </div>
</template>

<style lang="scss">
.tests-item {
    border-radius: 16px;
    border: 1px solid $gray-6;
    padding: 16px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title-test {
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
