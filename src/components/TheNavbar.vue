<script setup>

import {useRoute} from "vue-router/dist/vue-router";
import {useAuthStore} from "../stores/auth";

const authStore = useAuthStore();
const route = useRoute();

const isLinkActive = (pathName) => {
  if (route.name === pathName) {
    return "#333333";
  }
  return '';
}
</script>

<template>
  <nav class="flex justify-between items-center px-2 w-full">
    <ul class="flex">
      <router-link :to="{name:'home'}" class="px-4 py-2 rounded cursor-pointer"
                   :style="{backgroundColor: isLinkActive('home')}">
        The hits
      </router-link>
      <router-link :to="{name:'favorites'}" class="px-4 py-2 rounded cursor-pointer"
                   :style="{backgroundColor: isLinkActive('favorites')}">My favorite hits
      </router-link>
    </ul>
    <div class="flex bg-black rounded-xl pr-2 py-0.5 items-center">
      <img
          alt="Your profile image"
          class="w-6 h-6 rounded-full mr-2"
          src="@/assets/profile_image.jpeg"
      />
      <span class="text-xs mr-1 hidden sm:block">{{ authStore.auth.user.email }}</span>
      <svg
          @click="login"
          class="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            stroke-linecap="round"
            stroke-linejoin="round"/>
      </svg>
    </div>
  </nav>
</template>