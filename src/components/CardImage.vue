<script setup>
const props = defineProps({
  width: Number,
  height: Number,
});
console.log(props.width);
</script>

<template>
  <img
      class="rounded-lg"
      :width="width ?? ''"
      :height="height ?? ''"
      alt=""
      src="https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e"
  />
</template>


<style scoped>

</style>