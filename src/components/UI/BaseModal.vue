<script setup>
import { ref, useAttrs } from 'vue-demi'

const emit = defineEmits(['update:modelValue', 'close', 'beforeShow'])
const props = defineProps({
    modelValue: Boolean,
})

const mouseDownWithinModal = ref(false)
const attrs = useAttrs()
function close() {
    emit('close')
    mouseDownWithinModal.value = false
}

function beforeShow() {
    emit('beforeShow')
}

function handleMouseDown() {
    mouseDownWithinModal.value = true
}
function handleMouseUp() {
    if (mouseDownWithinModal.value) {
        close()
    }
}
</script>
<template>
    <q-dialog
        id="base-modal"
        v-bind="attrs"
        :model-value="modelValue"
        @hide="close"
        @before-show="beforeShow"
    >
        <div
            class="modal-scroll-wrap"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
        >
            <q-card @mousedown.stop @mouseup.stop>
                <slot />
            </q-card>
        </div>
    </q-dialog>
</template>

<style></style>
