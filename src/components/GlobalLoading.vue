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
            <q-spinner-grid color="primary" size="50px" />
        </div>
    </q-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from 'src/stores/main'

const { siteLoader } = storeToRefs(useMainStore())
</script>
