<script lang="ts" setup>
import { soundManager } from '~/logic/sound-loader'
import mitt from '~/logic/sound-loader/mitt'

const song = defineModel<string>('song')
const singer = defineModel<string>('singer')
const url = defineModel<string>('url')
const thumbnail = defineModel<string>('thumbnail')
const lyric = defineModel<string>('lyric')

function handleAddSong() {
  const info = {
    song: unref(song) || '',
    singer: unref(singer) || '',
    url: unref(url) || '',
    thumbnail: unref(thumbnail) || '',
    lyric: unref(lyric) || '',
  }

  if (info.url) {
    const cid = soundManager.add(info)
    soundManager.play(cid)

    mitt.emit('add')
  }
}
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
    <legend class="fieldset-legend">
      Song Details
    </legend>

    <label class="label">Song</label>
    <input v-model="song" type="text" class="input" placeholder="Song Name">

    <label class="label">Singer</label>
    <input v-model="singer" type="text" class="input" placeholder="Song Singer">

    <label class="label">Url</label>
    <input v-model="url" type="text" class="input" placeholder="Song Url">

    <label class="label">Thumbnail</label>
    <input v-model="thumbnail" type="text" class="input" placeholder="Song Thumbnail">

    <label class="label">Lyric</label>
    <input v-model="lyric" type="text" class="input" placeholder="Song Lyrics">

    <button class="btn btn-neutral mt-4" @click="handleAddSong">
      Add and Play
    </button>
  </fieldset>
</template>
