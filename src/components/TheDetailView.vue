<script setup>
import TheNavbar from "./TheNavbar.vue";
import CardImage from "./CardImage.vue";
import Song from "./Song.vue";
import LineSeparator from "./LineSeparator.vue";
import AlbumSongsTableHeader from "./AlbumSongsTableHeader.vue";
import {useSongsStore} from "../stores/songs";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import {useRoute} from "vue-router";
import {storeToRefs} from 'pinia'

const route = useRoute();
const songsStore = useSongsStore();
const {selectedAlbum} = storeToRefs(songsStore);
const audio = ref(new Audio());

const playAudio = (previewUrl) => {
  if (previewUrl === null) return;
  audio.value.src = previewUrl;
  audio.value.play();
}
onBeforeMount(() => {
  songsStore.getAlbum(getAlbumId());
})

onBeforeUnmount(() => {
  audio.value.pause();
})

const getAlbumId = () => {
  return route.params.id;
}

</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="flex flex-col h-full mt-3 w-full">
      <div class="bg-gradient-to-b from-teal-800 to-teal-500 px-3 pb-4 pt-16">
        <div class="flex items-end gap-x-4 w-full">
          <CardImage class="shadow-2xl" height="180" width="180" :imageUrl="selectedAlbum.album.image"/>
          <div class="flex flex-col flex-1">
            <span class="text-xs font-light uppercase">Album</span>
            <p class="text-4xl font-bold break-all">{{ selectedAlbum.album.name }}</p>
            <p class="text-xs font-semibold mt-1">
              {{ selectedAlbum.album.artist }}
            </p>
          </div>
        </div>
      </div>
      <div class="px-3 text-gray-400 font-light text-xs items-center mt-8">

        <AlbumSongsTableHeader/>
        <LineSeparator/>

        <Song v-for="(song,index) in selectedAlbum.songs"
              :key="song.id" :id="index+1"
              :song="song" @play="playAudio"
        />

      </div>


    </div>

  </div>
</template>


<style scoped>

</style>