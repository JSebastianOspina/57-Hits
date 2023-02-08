<script setup>
import TheNavbar from "./TheNavbar.vue";
import FavoriteCard from "./FavoriteCard.vue";
import AlbumCard from "./AlbumCard.vue";
import {useRouter} from "vue-router";
import {useMusicStore} from "../stores/music";
import {onBeforeMount} from "vue";

const musicStore = useMusicStore();
const router = useRouter();

onBeforeMount(() => {
  if (musicStore.albums.length === 0) {
    musicStore.getAlbums();
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
        <AlbumCard v-for="album in musicStore.albums" :key="album.id"
                   :id="album.id" :artist="album.artist" :imageUrl="album.image" :name="album.name"
        />
        <div class="col-span-full flex justify-center my-3">
          <button class="rounded-full w-full md:w-1/2 border-white border py-2 font-bold"
          @click="(e)=>{musicStore.getAlbums()}">
            Give me more!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
