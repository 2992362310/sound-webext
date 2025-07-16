<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [show, toggle] = useToggle(false)
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      v-show="show"
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Sound WebExt
      </h1>
      <SharedSubtitle />

      <div class="avatar-group -space-x-6">
        <div class="avatar">
          <div class="w-12">
            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp">
          </div>
        </div>
        <div class="avatar">
          <div class="w-12">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp">
          </div>
        </div>
        <div class="avatar">
          <div class="w-12">
            <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp">
          </div>
        </div>
        <div class="avatar">
          <div class="w-12">
            <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp">
          </div>
        </div>
      </div>
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none bg-teal-600 hover:bg-teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
