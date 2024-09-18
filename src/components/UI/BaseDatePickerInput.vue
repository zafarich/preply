<script setup>
import { ref } from 'vue-demi'
import BaseInput from 'components/UI/BaseInput.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// const props =
defineProps({
    modelValue: [Number, String, Object],
    loading: {
        type: Boolean,
        default: false,
    },
    dateMask: {
        type: String,
        default: 'DD.MM.YYYY',
    },
    dateIconName: {
        type: String,
        default: 'event',
    },
    dateIconColor: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])
const qDateProxy = ref(null)
function change(v) {
    emit('update:modelValue', v)
    qDateProxy.value.hide()
}
</script>

<template>
    <BaseInput
        color="teal"
        :readonly="loading"
        :disable="loading"
        append
        class="datepicker-input"
        @update:model-value="change"
        :model-value="modelValue"
        v-bind="$attrs"
    >
        <!-- :rules="['date']" -->
        <template v-slot:append>
            <q-icon
                :name="dateIconName"
                class="cursor-pointer"
                :color="dateIconColor"
            >
                <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                >
                    <q-date
                        today-btn
                        v-bind="$attrs"
                        :mask="dateMask"
                        :subtitle="modelValue ? '' : t('year')"
                        :title="modelValue ? '' : t('date')"
                        :model-value="modelValue"
                        @update:model-value="change"
                    />
                </q-popup-proxy>
            </q-icon>
        </template>
    </BaseInput>
</template>

<style lang="scss">
// .datepicker-input {
// }
</style>
