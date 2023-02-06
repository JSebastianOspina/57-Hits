<script setup>
import CardImage from "./CardImage.vue";
import AlbumCardText from "./AlbumCardText.vue";</script>

<template>
  <router-link
      :to="{name:'detail',params:{id:1}}"
      class="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  flex flex-col px-2.5 pt-2.5 pb-5"
      style="background-color: #191919"
  >
    <CardImage/>
    <AlbumCardText/>
  </router-link>
</template>
