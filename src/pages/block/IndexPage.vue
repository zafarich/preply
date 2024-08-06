<template>
    <div>
        <div class="text-bold mt-6 mb-6 text-xl">
            {{ $t('solve_block_test') }}
        </div>

        <BlockTestStart />
    </div>
</template>

<script setup>
import BlockTestStart from 'src/components/BlockTestStart.vue'
</script>

<style lang="scss">
.block-module {
    border-radius: 6px;
    border: 1px solid $gray-5;
    padding: 24px 16px;
}
</style>
