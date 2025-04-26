<template>
  <div class="w-screen h-screen p-4 flex items-center justify-center">
    <div class="wrapper p-2 w-full">
      <h1 class="text-center font-bold text-3xl text-slate-700">Halo</h1>
      <h3 class="text-center text-lg text-gray-600">Silahkan Pilih Menu</h3>
      <div class="menu flex flex-col p-4">
        <RouterLink
          to="akademik"
          class="text-center w-full my-4 p-4 text-lg uppercase font-semibold tracking-wider text-white rounded-full bg-sky-500"
        >
          Akademik
        </RouterLink>
        <RouterLink
          to="kaih"
          class="text-center w-full my-4 p-4 text-lg uppercase font-semibold tracking-wider text-white rounded-full bg-sky-500"
        >
          Pembiasaan
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
