<template>
    <q-dialog
        v-model="siteLoader"
        persistent
        :maximized="true"
        no-backdrop-dismiss
        no-esc-dismiss
        transition-show="none"
        transition-hide="none"
    >
        <div
            class="q-pa-md row justify-center items-center"
            style="background-color: white; height: 100%"
        >
            <!-- <q-spinner-ios color="primary" size="50px" /> -->

            <img src="/icons/global-loader.svg" class="spinner h-16" />
        </div>
    </q-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'

const { siteLoader } = storeToRefs(useMainStore())
</script>

<style scoped>
.spinner {
    animation: spin 850ms linear infinite;
    width: 50px; /* Adjust size */
    height: 50px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
