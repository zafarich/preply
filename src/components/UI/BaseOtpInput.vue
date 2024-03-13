<script setup>
import BaseTimer from "./BaseTimer.vue";
import BaseInput from "./BaseInput.vue";
import { ref } from "vue-demi";
defineProps({
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
  startTime: {
    type: Number,
    default: 180,
  },
});
const emit = defineEmits(["update:modelValue", "otp-time-is-up"]);

function change(v) {
  emit("update:modelValue", v?.trim());
}
function handleOTPTimeIsUp() {
  emit("otp-time-is-up");
}
const timerRef = ref(null);
defineExpose({
  reset() {
    timerRef.value.start();
  },
});
</script>
<template>
  <BaseInput
    :model-value="modelValue"
    ref="otpRef"
    name="otp-number"
    standout="standout-bg-gray"
    type="tel"
    mask="### ###"
    append
    v-bind="$attrs"
    @update:model-value="change"
  >
    <template #append>
      <BaseTimer
        ref="timerRef"
        :start-time="startTime"
        @on-complete="handleOTPTimeIsUp"
      />
    </template>
  </BaseInput>
</template>

<style lang="scss" scoped></style>
