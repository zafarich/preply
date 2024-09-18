<template>
    <div class="back-panel">
        <q-btn
            no-caps
            color="primary"
            flat
            icon="eva-chevron-left-outline"
            class="back-btn"
        />
        <div class="title-top">{{ title }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})
</script>

<style lang="scss" scoped>
.back-panel {
    display: flex;
    padding: 8px 15px;
    position: sticky;
    top: 0;
    align-items: center;
    border-bottom: 1px solid $border-color;
    .back-btn {
        padding: 0px 5px !important;
    }
    .title-top {
        font-size: 16px;
        color: $dark;
        margin-left: 10px;
        font-weight: 500;
    }
}
</style>
