<script setup>
import TheNavbar from "./TheNavbar.vue";
import Song from "./Song.vue";
import LineSeparator from "./LineSeparator.vue";
import AlbumSongsTableHeader from "./AlbumSongsTableHeader.vue";
import FavoriteCard from "./FavoriteCard.vue";
import {useSongsStore} from "../stores/songs";
import {ref} from "vue";

const songsStore = useSongsStore();
const audio = ref(new Audio());

const playAudio = (previewUrl) => {
  if (previewUrl === null) return;
  audio.value.src = previewUrl;
  audio.value.play();
}
</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="flex flex-col h-full mt-4 w-full px-4">
      <FavoriteCard/>
      <div class="px-3 text-gray-400 font-light text-xs items-center mt-8">
        <AlbumSongsTableHeader/>
        <LineSeparator/>
        <Song v-for="(song,index) in songsStore.favorites"
              :key="song.id" :id="index+1"
              :song="song" @play="playAudio"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>