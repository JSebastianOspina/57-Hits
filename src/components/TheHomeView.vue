<script setup>
import TheNavbar from "./TheNavbar.vue";
import FavoriteCard from "./FavoriteCard.vue";
import AlbumCard from "./AlbumCard.vue";
import {useRouter} from "vue-router";
import {useSongsStore} from "../stores/songs";
import {onBeforeMount} from "vue";

const songsStore = useSongsStore();
const router = useRouter();

onBeforeMount(() => {
  if (songsStore.albums.length === 0) {
    songsStore.getAlbums();
  }
})

const goToFavorites = () => {
  router.push({name: "favorites"});
}


</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="px-4 h-full mt-4 w-full">
      <div class="grid grid-cols-12 gap-5 h-full">
        <FavoriteCard @click="goToFavorites" class="cursor-pointer"/>
        <AlbumCard v-for="album in songsStore.albums" :key="album.id"
                   :id="album.id" :artist="album.artist" :imageUrl="album.image" :name="album.name"
        />
      </div>
    </div>
  </div>
</template>
