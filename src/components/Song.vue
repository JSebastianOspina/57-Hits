<script setup>
import {computed, ref} from "vue";

const isFav = ref(false);
const handleFavorite = () => {
  isFav.value = !(isFav.value);
}
const durationInMinutes = computed(() => {
  const durationInMs = props.duration;
  let inMinutes = (durationInMs) / 1000 / 60; //From ms to seconds, then to minutes.
  let seconds = ((inMinutes % 1) * 60).toFixed(0) //Extract seconds , and remove decimal;
  inMinutes = (inMinutes < 10) ? "0" + inMinutes : inMinutes; //add 0 if less than 10
  seconds = (seconds < 10) ? "0" + seconds : seconds;//add 0 if less than 10
  return `${Math.trunc(inMinutes)}:${seconds}`;
})

const props = defineProps({
  id: Number,
  name: String,
  artist: String,
  duration: Number
});
</script>
<template>
  <div class="col-span-full grid grid-cols-12 items-center py-1.5 px-3 main">
    <span>{{ id }}</span>
    <div class="col-span-8">
      <p class="text-white font-base">{{ name }}</p>
      <p>{{ artist }}</p>
    </div>
    <div class="col-span-3 text-right flex items-center justify-end">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
           class="w-4 h-4 cursor-pointer" @click="handleFavorite" :class="{
             'text-grey-100' :!isFav,
             'text-green-700' : isFav,
           }">
        <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
      </svg>
      <span class="text-right ml-3">{{ durationInMinutes }}</span>
    </div>
  </div>
</template>
<style scoped>
.main:hover {
  background-color: #454545;
}
</style>