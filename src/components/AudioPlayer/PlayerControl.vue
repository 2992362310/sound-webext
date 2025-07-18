<script setup lang="ts">
const duration = defineModel<number>('duration', {
  default: 60,
  set: value => Number(value),
})

const currentTime = defineModel<number>('currentTime', {
  default: 0,
  set: value => Number(value),
})

function formatTime(seconds: number = 0): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`
}

const time = computed(() => {
  return `${formatTime(currentTime.value)}/${formatTime(duration.value)}`
})
</script>

<template>
  <section class="bg-card">
    <div class="flex-between mb-1">
      <span> song/singer </span>
      <span>{{ time }}</span>
    </div>
    <input v-model="currentTime" type="range" min="0" :max="duration" step="1" class="range range-xs">
  </section>
</template>
