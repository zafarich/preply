<template>
  <div class="timer">
    <template v-if="hours > 0">
      <span class="hours">
        {{ hours }}
      </span>
      <span class="delimetr">:</span>
    </template>
    <span class="minutes">
      {{ minutes }}
    </span>
    <span class="delimetr">:</span>
    <span class="seconds">
      {{ seconds }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue-demi';
const props = defineProps({
  startTime: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['on-complete']);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let time = 0;
let timeout = null;

onMounted(() => {
  start();
});
onBeforeUnmount(() => {
  stop();
});

function start() {
  time = props.startTime;
  tick();
  timeout = setInterval(() => {
    if (time > 0) tick();
  }, 1000);
}

function tick() {
  time--;
  render();
  if (time <= 0) {
    stop();
    emit('on-complete');
  }
}

function render() {
  let h_s = parseInt(time % 3600);

  hours.value = unitFormatting(parseInt(time / 3600));
  minutes.value = unitFormatting(parseInt(h_s / 60));
  seconds.value = unitFormatting(h_s % 60);
}

function stop() {
  clearTimeout(timeout);
}

function unitFormatting(unit) {
  return ('00' + unit).slice(String(unit).length);
}

defineExpose({
  start,
  stop,
});
</script>

<style lang="scss" scoped></style>
