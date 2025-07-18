<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'update', volue: number): void
}>()

const volume = defineModel<number>({
  required: true,
  set(value) {
    return Number(value)
  },
})

let tempVolume = volume.value
const showControl = ref(false)

function handleControl() {
  showControl.value = !showControl.value
}

function handleVolume() {
  if (volume.value !== 0) {
    tempVolume = volume.value
    volume.value = 0
  }
  else {
    volume.value = tempVolume
  }
}

watch(volume, (val) => {
  emits('update', val)
})
</script>

<template>
  <section class="relative bg-card">
    <button class="btn btn-xs btn-ghost btn-circle" @click="handleControl">
      <mdi-volume-control class="h-5 w-5" />
    </button>

    <div v-if="showControl" class="absolute bg-card flex items-center gap-1 mt-1">
      <button class="btn btn-xs btn-ghost btn-circle" @click="handleVolume">
        <mdi-mute v-if="volume === 0" class="h-4 w-4" />
        <mdi-volume v-else class="h-4 w-4" />
      </button>

      <div class="tooltip ">
        <div class="tooltip-content">
          {{ (volume * 100).toFixed(0) }}%
        </div>
        <input v-model="volume" type="range" min="0" max="1" step="0.01" class="range range-xs">
      </div>
    </div>
  </section>
</template>
