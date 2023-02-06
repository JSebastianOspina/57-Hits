<script setup>
import {computed} from "vue";

const getBackgroundColor = computed(() => {

});
</script>
<template>
  <div :style="{'background-color': getBackgroundColor}"
       class="col-span-full grid grid-cols-12 items-center py-1.5 px-3 main">
    <span>1</span>
    <div class="col-span-8">
      <p class="text-white font-base">Getting Older</p>
      <p>Billie Elish</p>
    </div>
    <span class="col-span-3 text-right">4:04</span>
  </div>
</template>
<style scoped>
.main:hover {
  background-color: #454545;
}
</style>