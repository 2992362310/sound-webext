<script setup lang="ts">
// import DOMPurify from 'dompurify'
import { list, ne_get_playlist, ne_show_toplist, ng_parse_playlist_tracks } from '~/logic/sound-loader/plugins/source/netease'
import { get_playlist_filters } from '~/logic/sound-loader/plugins/source/qq'

const containerRef = ref<HTMLElement>()
async function todo() {
  ne_get_playlist(13998261384)

  // list()
  // ne_show_toplist()
  // get_playlist_filters()
}
</script>

<template>
  <main class="w-full px-4 py-5">
    <Tab>
      <TabItem tab="Play List" checked>
        <Collapse title="Add Song">
          <AddSong />
        </Collapse>
        <AudioPlayer />
      </TabItem>
      <TabItem tab="Source List">
        <!-- <Collapse title="Add Source">
          <AddSource />
        </Collapse> -->
        <Collapse title="Frame">
          <div ref="containerRef" />
          <button class="btn" @click="todo">
            Song
          </button>
        </Collapse>
      </TabItem>
    </Tab>
  </main>
</template>
