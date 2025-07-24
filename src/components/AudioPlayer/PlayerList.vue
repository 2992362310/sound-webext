<script lang="ts" setup>
import { soundManager } from '~/logic/sound-loader'
import mitt from '~/logic/sound-loader/mitt'
import type { ISoundItem } from '~/logic/sound-loader/types'

const sounds = ref<ISoundItem[]>([])

onMounted(() => {
  // Initialize sounds from soundManager
  sounds.value = soundManager.sounds

  mitt.on('add', () => {
    sounds.value = soundManager.getSounds()
  })
})
</script>

<template>
  <Collapse title="Player List" class="mt-2">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li v-if="sounds.length === 0" class="list-row">
        Empty
      </li>

      <li v-for="(sound, index) in sounds" :key="sound.cid" class="list-row">
        <div class="text-4xl font-thin opacity-30 tabular-nums">
          {{ index + 1 }}
        </div>
        <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"></div>
        <div class="list-col-grow">
          <div>{{ sound.info.song }}</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ sound.info.singer || 'Unknown Artist' }}
          </div>
        </div>
        <button class="btn btn-square btn-ghost">
          <mdi-play />
        </button>
      </li>
    </ul>
  </Collapse>
</template>
