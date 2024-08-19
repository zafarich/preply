<template>
    <BaseModal
        :model-value="fireWorksModal"
        @close="close"
        class="warning-modal"
        id="fireworks-modal"
    >
        <div>
            <div class="row items-center q-pb-none">
                <div class="title-modal font-bold text-xl text-center"></div>
                <q-space />
                <button class="close-modal_btn" v-close-popup>
                    <img src="/images/icons/close-modal.png" alt="" />
                </button>
            </div>

            <div class="pyro">
                <canvas id="fireworks-canvas" class="absolute inset-0"></canvas>
                <img src="/icons/global-loader.svg" class="h-12 mx-auto mb-3" />
                <div class="flex justify-center items-center text-xl font-bold">
                    {{ $t('success_welcome') }}
                </div>
                <div class="before"></div>
                <div class="after"></div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseModal from 'src/components/UI/BaseModal.vue'
import { useModalStore } from 'src/stores/modal'
import Fireworks from 'fireworks-js'

const modalStore = useModalStore()
const { fireWorksModal } = storeToRefs(modalStore)

const close = () => {
    fireWorksModal.value = false
}

let fireworksInstance = null

const startFireworks = () => {
    const canvas = document.getElementById('fireworks-canvas')
    if (canvas && !fireworksInstance) {
        fireworksInstance = new Fireworks(canvas, {
            speed: 3,
            acceleration: 1.05,
            friction: 0.98,
            gravity: 1,
            particles: 100,
            explosion: 5,
        })
        fireworksInstance.start()
    }
}

onMounted(() => {
    watch(fireWorksModal, (newValue) => {
        if (newValue) {
            startFireworks()
        } else if (fireworksInstance) {
            fireworksInstance.stop()
        }
    })
})
</script>

<style lang="scss">
.pyro {
    position: relative;
    height: 100%;
}

#fireworks-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
