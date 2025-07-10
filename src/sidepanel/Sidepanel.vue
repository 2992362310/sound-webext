<script setup lang="ts">
import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-full px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Sidepanel</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>

    <div class="carousel carousel-vertical rounded-box h-96">
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp">
      </div>
      <div class="carousel-item h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp">
      </div>
    </div>
  </main>
</template>
