<script lang="ts" setup>
import AudioControl from './AudioControl.vue'
import PlayerControl from './PlayerControl.vue'
import PlayerList from './PlayerList.vue'
import VolumeControl from './VolumeControl.vue'

const volume = ref(0.9)

function handleUpdateVolume(val: number) {
  volume.value = val
}
</script>

<template>
  <PlayerList />
  <PlayerControl />
  <AudioControl />
  <VolumeControl v-model="volume" @update="handleUpdateVolume" />
</template>
