<script setup>
import TheNavbar from "./TheNavbar.vue";
import Song from "./Song.vue";
import LineSeparator from "./LineSeparator.vue";
import AlbumSongsHeader from "./AlbumSongsHeader.vue";
import FavoriteCard from "./FavoriteCard.vue";
</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="flex flex-col h-full mt-4 w-full px-4">
      <FavoriteCard/>
      <div class="px-3 text-gray-400 font-light text-xs items-center mt-8">
        <AlbumSongsHeader/>
        <LineSeparator/>
        <Song v-for="i in 15" :key="i"/>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>