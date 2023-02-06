<script setup>
import TheNavbar from "./TheNavbar.vue";
import CardImage from "./CardImage.vue";
import AlbumSong from "./AlbumSong.vue";
import LineSeparator from "./LineSeparator.vue";
import AlbumSongsHeader from "./AlbumSongsHeader.vue";</script>

<template>
  <div class="container mx-auto my-2">
    <TheNavbar/>
    <div class="flex flex-col h-full mt-3 w-full">
      <div class="bg-gradient-to-b from-teal-800 to-teal-500 px-3 pb-4 pt-16">
        <div class="flex items-end gap-x-4 w-full">
          <CardImage class="shadow-2xl " height="180" width="180"/>
          <div class="flex flex-col flex-1">
            <span class="text-xs font-light uppercase">Album</span>
            <p class="text-4xl font-bold break-all">Happier Than Ever</p>
            <p class="text-xs font-semibold">
              2021 • 16 canciones
            </p>
          </div>
        </div>
      </div>
      <div class="my-4 px-3">
        <button class="uppercase border border-white py-1 px-3 rounded text-xs tracking-widest ">
          <span>Favorite</span>
        </button>
      </div>

      <div class="px-3 text-gray-400 font-light text-xs items-center">

        <AlbumSongsHeader/>
        <LineSeparator/>

        <AlbumSong v-for="i in 15" :key="i"/>

      </div>


    </div>

  </div>
</template>


<style scoped>

</style>