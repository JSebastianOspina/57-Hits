<script setup>
import TheNavbar from "./TheNavbar.vue";
import AlbumBanner from "./AlbumBanner.vue";
import Song from "./Song.vue";
import LineSeparator from "./LineSeparator.vue";
import AlbumSongsTableHeader from "./AlbumSongsTableHeader.vue";
import ErrorMessage from "./ErrorMessage.vue";

import {useMusicStore} from "../stores/music";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import {useRoute} from "vue-router";
import {storeToRefs} from 'pinia'

const route = useRoute();
const musicStore = useMusicStore();
const {selectedAlbum, errorFetching} = storeToRefs(musicStore);
const audio = ref(new Audio());

const playAudio = (previewUrl) => {
  if (previewUrl === null) return;
  audio.value.src = previewUrl;
  audio.value.play();
}
onBeforeMount(() => {
  musicStore.getAlbum(getAlbumId());
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
    <template v-if="!errorFetching">
      <div class="flex flex-col h-full mt-3 w-full">
        <AlbumBanner :selectedAlbum="selectedAlbum"/>
      </div>
      <div class="px-3 text-gray-400 font-light text-xs items-center mt-8">
        <AlbumSongsTableHeader/>
        <LineSeparator/>
        <Song v-for="(song,index) in selectedAlbum.songs"
              :id="index+1" :key="song.id"
              :song="song" @play="playAudio"
        />
      </div>
    </template>

    <ErrorMessage v-else/>


  </div>

</template>


<style scoped>

</style>