<script setup lang="ts">
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
        Source List
      </TabItem>
    </Tab>
  </main>
</template>
