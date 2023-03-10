<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {useMusicStore} from "../stores/music";

const musicStore = useMusicStore()
const isFav = ref(false);

onBeforeMount(() => {
  isFav.value = isTheSongFav();
});

const isTheSongFav = () => {
  let isPresented = false;
  musicStore.favorites.forEach((favorite)=>{
    if(favorite.id === props.song.id){
      isPresented = true;
    }
  });
  return isPresented;
}

const handleFavorite = () => {
  const newValue = !(isFav.value);
  isFav.value = newValue;
  if (newValue === true) {
    musicStore.addFavorite(props.song);
  } else {
    musicStore.removeFavorite(props.song);
  }
}

const durationInMinutes = computed(() => {
  const durationInMs = props.song.duration;
  let inMinutes = (durationInMs) / 1000 / 60; //From ms to seconds, then to minutes.
  let seconds = ((inMinutes % 1) * 60).toFixed(0) //Extract seconds , and remove decimal;
  inMinutes = (inMinutes < 10) ? "0" + inMinutes : inMinutes; //add 0 if less than 10
  seconds = (seconds < 10) ? "0" + seconds : seconds;//add 0 if less than 10
  return `${Math.trunc(inMinutes)}:${seconds}`;
})

const props = defineProps({
  id: Number,
  song: Object,
});

</script>
<template>
  <div class="col-span-full grid grid-cols-12 items-center py-1.5 px-3 main" data-test="song">
    <span>{{ id }}</span>
    <div class="col-span-8 cursor-pointer" @click="$emit('play',song.previewUrl)">
      <p class="text-white font-base">{{ song.name }}</p>
      <p>{{ song.artist }}</p>
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