<script setup>
import LineSeparator from "./LineSeparator.vue";
import {ref} from "vue";
import {useAuthStore} from "../stores/auth";
import {useRouter} from "vue-router";

const router = useRouter();
const email = ref('');
const password = ref('');

const authStore = useAuthStore();
const login = (e) => {
  e.preventDefault();
  authStore.login(email.value, password.value); //Ask for login
  if (authStore.auth.error.hasError) {
    return;
  }
  router.push({name: 'home'});
}
</script>


<template>
  <div class="mx-auto py-3 h-screen">
    <div class="flex flex-col justify-between items-center h-full mx-auto w-full ">
      <div class="w-full text-center">
        <p class="font-bold text-xl">
          57Hits
        </p>
        <LineSeparator/>
      </div>

      <div class="px-3 w-full md:w-2/5 mx-auto flex flex-col justify-center">
        <form @submit="login">
          <div class="flex flex-col w-full">
            <label class="font-semibold mb-2" for="email">Email address</label>
            <input id="email" ref="emailRef" v-model="email" class="w-full p-2 text-black"
                   name="email"
                   placeholder="Please enter your email address"
                   required type="text">
            <span v-if="authStore.auth.error.field === 'email'"
                  class="text-sm text-red-600 mt-2">{{ authStore.auth.error.message }}</span>
          </div>

          <div class="flex flex-col w-full mt-4">
            <label class="font-semibold mb-2" for="password">Password</label>
            <input id="password" ref="passwordRef" v-model="password" class="w-full p-2 text-black"
                   name="password"
                   placeholder="Please enter your password"
                   required
                   type="password"
            >
            <span v-if="authStore.auth.error.field === 'password'"
                  class="text-sm text-red-600 mt-2">{{ authStore.auth.error.message }}</span>
          </div>

          <button class="rounded-full w-full bg-teal-700 mt-5 py-2 font-bold" type="submit">
            Login
          </button>
        </form>

        <p class="text-xl text-center font-bold mt-10">You don't have an account?</p>
        <button class="rounded-full w-full border-white border mt-5 py-2 font-bold">
          Register
        </button>
      </div>

      <div class="w-full text-center">
        <LineSeparator/>
        <p class="font-bold text-xl">
          57Hits
        </p>

      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
<script>export default {
  components: {}
}
</script>