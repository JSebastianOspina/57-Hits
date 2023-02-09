<script setup>
import CardImage from "./CardImage.vue";

defineProps({
  selectedAlbum: Object
})
</script>
<template>
  <div class="bg-gradient-to-b from-teal-800 to-teal-500 px-3 pb-4 pt-16">
    <div class="flex items-end gap-x-4 w-full">
      <CardImage :imageUrl="selectedAlbum.album.image" class="shadow-2xl" height="180" width="180"/>
      <div class="flex flex-col flex-1">
        <span class="text-xs font-light uppercase">Album</span>
        <p class="text-4xl font-bold break-all">{{ selectedAlbum.album.name }}</p>
        <p class="text-xs font-semibold mt-1">
          {{ selectedAlbum.album.artist }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>