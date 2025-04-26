<template>
  <div class="w-screen h-screen p-4 relative">
    <div class="wrapper p-2 w-full">
      <h1 class="text-center font-bold text-3xl text-slate-700">Data Pelaskanaan</h1>
      <h3 class="text-center text-lg text-gray-600">Tujuh Kebiasaan Anak Indonesia Hebat</h3>

      <table class="w-full my-4">
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-400 text-slate-700 py-2 px-1">No</th>
            <th class="border border-slate-400 text-slate-700 py-2">Kebiasaan</th>
            <th class="border border-slate-400 text-slate-700 py-2">Waktu, tanggal</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, i) in datas" :key="i">
            <tr>
              <td class="border border border-slate-400 text-slate-700 px-1 text-center">
                {{ i + 1 }}
              </td>
              <td class="border border border-slate-400 text-slate-700 py-1 px-2">
                {{ data.kebiasaan }}
              </td>
              <td class="border border border-slate-400 text-slate-700 py-1 px-2">
                {{ data.waktu }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <button
      class="absolute w-[60px] h-[60px] rounded-full text-xl font-bold text-white bg-sky-400 shadow shadow-lg right-8 bottom-8"
    >
      +
    </button>
    <div class="dialog fixed top-0 right-0 bottom-0 left-0 bg-[#34347466] backdrop-blur z-40">
      tes
    </div>
  </div>
  <!-- Dialog Form -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const datas = ref([{ kebiasaan: 'Berolahraga', waktu: '2025-04-23 15:50:00' }])
</script>
