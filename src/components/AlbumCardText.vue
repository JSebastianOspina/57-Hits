<script setup>
defineProps({
  albumName: String,
  artistName: String,
});
</script>

<template>
  <div class="flex flex-col gap-y-0.5 mt-3">
    <span class="font-semibold text-sm">{{ albumName }}</span>
    <span class="font-light text-xs text-gray-400">{{ artistName }}</span>
  </div>
</template>


