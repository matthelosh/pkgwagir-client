<template>
  <div
    class="w-screen h-screen p-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-sky-100"
  >
    <div class="login-form">
      <h1 class="text-center text-2xl font-black uppercase">Progres Belajar Siswa</h1>
      <h3 class="text-center font-bold uppercase">PKG Kec. Wagir</h3>
      <div class="form border px-4 w-full py-4 rounded my-4">
        <h1 class="text-center text-2xl font-bold">Silahkan Masuk</h1>
        <form @submit.prevent="login" class="flex flex-col">
          <label for="username" class="my-2 flex flex-col justify-between">
            <span class="text-slate-700">Username:</span>
            <input
              type="text"
              name="username"
              v-model="credentials.username"
              class="border rounded focus:border-violet-500 focus:outline-violet-500 px-2 py-1 text-lg"
              placeholder="Isi Username"
            />
          </label>
          <label for="password" class="my-2 flex flex-col justify-between">
            <span class="text-slate-700">Password:</span>
            <input
              type="password"
              name="password"
              v-model="credentials.password"
              class="border rounded focus:border-violet-500 focus:outline-violet-500 px-2 py-1 text-lg"
              placeholder="Isi Password"
            />
          </label>
          <button
            type="submit"
            class="w-full my-4 rounded-full text-white py-1 uppercase font-bold bg-sky-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const credentials = ref({})
</script>
