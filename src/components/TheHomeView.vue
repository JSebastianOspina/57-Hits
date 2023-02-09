<script setup>
import {useRouter} from "vue-router";
import {useMusicStore} from "../stores/music";
import {onBeforeMount} from "vue";
import {storeToRefs} from "pinia";

import TheNavbar from "./TheNavbar.vue";
import FavoriteCard from "./FavoriteCard.vue";
import AlbumCard from "./AlbumCard.vue";
import ErrorMessage from "./ErrorMessage.vue";


const musicStore = useMusicStore();
const router = useRouter();

onBeforeMount(() => {
  //Fetch albums if the the state's property is empty
  if (musicStore.albums.length === 0) {
    musicStore.getAlbums();
  }
})

const {albums, errorFetching} = storeToRefs(musicStore);

const goToFavorites = () => {
  router.push({name: "favorites"});
}
</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="px-4 h-full mt-4 w-full">
      <div class="grid grid-cols-12 gap-5 h-full">
        <FavoriteCard class="cursor-pointer" @click="goToFavorites"/>

        <template v-if="!errorFetching">
          <AlbumCard v-for="album in albums" :id="album.id"
                     :key="album.id" :artist="album.artist" :imageUrl="album.image" :name="album.name"
          />
          <div class="col-span-full flex justify-center my-3">
            <button class="rounded-full w-full md:w-1/2 border-white border py-2 font-bold"
                    @click="(e)=>{musicStore.getAlbums()}">
              Give me more!
            </button>
          </div>
        </template>
        <div v-else class="col-span-full flex justify-center my-3">
          <ErrorMessage/>
        </div>


      </div>
    </div>
  </div>
</template>
