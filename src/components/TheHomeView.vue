<script setup>
import TheNavbar from "./TheNavbar.vue";
import FavoriteCard from "./FavoriteCard.vue";
import AlbumCard from "./AlbumCard.vue";
import {useRouter} from "vue-router";

const router = useRouter();
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
        <AlbumCard v-for="albumCard in 5" :key="albumCard"/>
      </div>
    </div>
  </div>
</template>
