<script lang="ts" setup>
import { sourceManager } from '~/logic/sound-loader'

const platform = defineModel<string>('netease')

function handleAddPlatform() {
  const info = {
    platform: unref(platform) || '',
  }

  sourceManager.getSource(info.platform)
}
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
    <legend class="fieldset-legend">
      Souce Details
    </legend>

    <label class="label">Platform</label>
    <input v-model="platform" type="text" class="input" placeholder="Song Name">

    <button class="btn btn-neutral mt-4" @click="handleAddPlatform">
      Add Platform
    </button>
  </fieldset>
</template>
