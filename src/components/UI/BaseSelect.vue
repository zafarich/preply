<template>
    <q-select
        class="base-select"
        dropdown-icon="keyboard_arrow_down"
        transition-show="jump-up"
        transition-hide="jump-down"
        hide-bottom-space
        :class="{ shake: isShaking }"
        lazy-rules="ondemand"
        v-bind="attrs"
        options-dense
        clearable
        @update:model-value="change"
        :option-label="optionLabel"
        :option-value="optionValue"
        :model-value="modelValue"
        behavior="menu"
        :error-label="errorLabel"
    >
        <template v-if="selected && modelValue" #selected>
            {{ t(modelValue?.label || '') }}
        </template>
        <template v-else-if="placeholder && !modelValue" #selected>
            <div class="placeholder">
                <span>{{ placeholder }}</span>
                <span v-if="required" class="text-red">*</span>
            </div>
        </template>
        <template v-if="!placeholder" #label>
            <span>{{ label }}</span>
        </template>
        <template v-if="append" #append>
            <slot name="append" />
        </template>
        <template v-if="prepend" #prepend>
            <slot name="prepend" />
        </template>
        <template v-if="option" #option="item">
            <slot name="option" v-bind="item" />
        </template>
        <!-- <template v-slot:append>
            <q-icon
                v-if="modelValue != ''"
                name="close"
                @click.stop.prevent="emit('update:modelValue', '')"
                class="cursor-pointer"
                size="xs"
            />
        </template> -->
    </q-select>
</template>

<script setup>
import { useAttrs } from 'vue-demi'
import { useI18n } from 'vue-i18n'
const attrs = useAttrs()

// const props =
defineProps({
    modelValue: [Number, String, Object],
    placeholder: String,
    required: {
        type: Boolean,
        default: false,
    },
    isShaking: {
        type: Boolean,
        default: false,
    },

    optionValue: {
        type: String,
    },
    optionLabel: {
        type: String,
    },
    append: {
        type: Boolean,
        default: false,
    },
    prepend: {
        type: Boolean,
        default: false,
    },
    option: {
        type: Boolean,
        default: false,
    },
    selected: {
        type: Boolean,
        default: false,
    },
    optionLabel: {
        type: String,
    },
    optionValue: {
        type: String,
    },
    errorLabel: {
        type: String,
    },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

function change(v) {
    emit('update:modelValue', v)
}
</script>

<style lang="scss">
.base-select {
    .q-icon {
        color: $primary;
    }
    &.q-field--standout.q-field--highlighted {
        .q-field__append {
            color: #cccccc !important;
        }
        .q-field__native {
            color: $dark;
        }
    }
    .q-field__control,
    .q-field--auto-height,
    .q-field__native {
        min-height: 48px !important;
    }

    .q-field__marginal {
        height: 48px;
    }
    .placeholder {
        color: #cecece;
        font-size: 16px;
        font-weight: 500;
    }
    .itemsCount {
        background-color: #0f0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 14px;
        color: #000;
        text-align: center;
    }

    .disabled,
    [disabled] {
        opacity: 1 !important;
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
}
</style>
