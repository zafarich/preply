<template>
    <q-input
        ref="inputRef"
        v-bind="$attrs"
        :model-value="modelValue"
        hide-bottom-space
        class="base-input"
        :class="{ shake: isShaking }"
        no-error-icon
        lazy-rules="ondemand"
        :type="innerType"
        @blur="onBlur"
        @focus="onFocus"
        @update:model-value="change"
    >
        <template v-if="append" #append>
            <slot name="append" />
        </template>
        <template v-if="prepend" #prepend>
            <slot name="prepend" />
        </template>
        <template v-if="after" #after>
            <slot name="after" />
        </template>
    </q-input>
</template>

<script setup>
import { prettify, trimBetween } from 'src/utils/helpers'
import { ref, onBeforeUnmount, useAttrs, onMounted, watch } from 'vue-demi'

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: null,
    },
    append: {
        type: Boolean,
        default: false,
    },
    prepend: {
        type: Boolean,
        default: false,
    },
    after: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    isShaking: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const inputRef = ref(null)
let inputEl = null

onBeforeUnmount(() => {
    inputEl?.removeEventListener('keydown', fixCursorPosition)
})

onMounted(() => {
    init()
})

function init() {
    const $el = inputRef.value?.$el
    if (attrs.mask && $el) {
        inputEl = $el.getElementsByTagName('input')[0]
        inputEl.addEventListener('keydown', fixCursorPosition)
    }
}

const fixCursorPosition = (e) => {
    let cursorPos = inputEl.selectionStart

    if (e.code === 'Backspace' || e.code === 'Delete') {
        setTimeout(() => setCursorPosition(e.target, cursorPos))
    }

    if (!e?.code?.startsWith('Digit')) return

    setTimeout(() => {
        const nextValue = e.target.value[++cursorPos]

        const characters = [' ', '.', '-', '_', '/']

        if (characters.includes(nextValue)) cursorPos++

        setCursorPosition(e.target, cursorPos)
    })
}

const setCursorPosition = (el, position) => {
    el.selectionStart = el.selectionEnd = position
}
onMounted(() => {
    if (props.type === 'number') {
        innerType.value = 'string'
        emit('update:modelValue', prettify(props.modelValue))
    }
})

function change(v) {
    emit('update:modelValue', v?.trim())
}
const innerType = ref(props.type)
watch(
    () => props.type,
    () => {
        innerType.value = props.type
    },
)

function focus() {
    inputRef.value.focus()
}
function resetValidation() {
    inputRef.value.resetValidation()
}
function onFocus(e) {
    if (props.type === 'number') {
        innerType.value = props.type
        emit('update:modelValue', trimBetween(e.target.value))
    }
}
function onBlur(e) {
    if (props.type === 'number') {
        innerType.value = 'string'
        emit('update:modelValue', prettify(e.target.value))
    }
}

defineExpose({
    focus,
    resetValidation,
})
</script>

<style lang="scss">
.q-field--standard .q-field__control::after {
    height: 1px !important;
}
.q-field--focused {
    .q-field__control::before {
        border-bottom: 1px solid transparent !important;
    }
}

.shake {
    animation: shake 0.5s;
}
@keyframes shake {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(5px);
    }
    75% {
        transform: translateX(-5px);
    }
    100% {
        transform: translateX(0);
    }
}

.base-input {
    .q-field__prepend {
        color: $dark !important;
        font-size: 14px !important;
        line-height: 17px !important;
        padding-right: 3px !important;
        font-weight: 500 !important;
    }

    &.q-field--standout.q-field--highlighted {
        .q-field__append {
        }

        .q-field__native {
            color: $dark !important;
        }
    }
    input {
        font-weight: 500;
    }
    .q-field__control {
        height: 40px;
    }
    .q-field__marginal {
        height: 100% !important;
    }
}
</style>
