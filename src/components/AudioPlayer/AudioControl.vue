<script lang="ts" setup>
import { ref } from 'vue'

const isPlaying = ref(false)

function handlePlay() {
  isPlaying.value = !isPlaying.value
}

function handlePrevoious() {}

function handleNext() {}
</script>

<template>
  <div class="bg-card flex-center">
    <button class="circle-btn" @click="handlePrevoious">
      <mdi-skip-previous />
    </button>
    <button class="circle-btn" @click="handlePlay">
      <mdi-play v-if="isPlaying" />
      <mdi-pause v-else />
    </button>
    <button class="circle-btn" @click="handleNext">
      <mdi-skip-next />
    </button>
    <button class="circle-btn">
      <mdi-repeat />
    </button>
    <button class="circle-btn">
      <mdi-shuffle />
    </button>
    <button class="circle-btn">
      <mdi-heart />
    </button>
  </div>
</template>
