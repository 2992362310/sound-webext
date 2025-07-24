<script lang="ts" setup>
interface CollapseItem {
  title: string
}

defineProps<CollapseItem>()
</script>

<template>
  <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
    <input type="checkbox">
    <div class="collapse-title font-semibold">
      <slot name="title">
        {{ title || 'Collapse Title' }}
      </slot>
    </div>
    <div class="collapse-content text-sm">
      <slot> Collapse Content</slot>
    </div>
  </div>
</template>
