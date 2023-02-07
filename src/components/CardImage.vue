<script setup>
defineProps({
  width: Number,
  height: Number,
  imageUrl:String
});
</script>

<template>
  <img
      class="rounded-lg"
      :width="width ?? ''"
      :height="height ?? ''"
      alt=""
      :src="imageUrl"
  />
</template>


<style scoped>

</style>