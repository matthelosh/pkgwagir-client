<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ToolBar from '@/components/ToolBar.vue'

const userStore = useUserStore()
const user = userStore.user

const mapels = [
  { kode: 'pabp', label: 'Agama' },
  { kode: 'bid', label: 'B. Indonesia' },
  { kode: 'pkn', label: 'Pancasila' },
  { kode: 'mtk', label: 'Matematika' },
  { kode: 'ipas', label: 'IPAS' },
  { kode: 'pjok', label: 'PJOK' },
  { kode: 'sr', label: 'Seni Rupa' },
  { kode: 'bj', label: 'B. Jawa' },
  { kode: 'ben', label: 'B. Inggris' },
]
</script>

<template>
  <div class="h-screen w-screen">
    <ToolBar />
    <div class="main h-full bg-sky-50 p-4">
      <h1 class="text-center text-lg uppercase font-bold">Data Nilai Akademik</h1>
      <div class="table-responsive w-full overflow-x-auto bg-white my-2">
        <table class="w-full">
          <thead>
            <tr>
              <th class="border p-1" rowspan="2">Mapel</th>
              <th class="border p-1" v-for="k in 6" :key="`kelas-${k}`" colspan="2">
                Kelas {{ k }}
              </th>
            </tr>
            <tr>
              <th class="border p-1" v-for="sem in 12" :key="`sem-${sem}`">Sem {{ sem }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(mapel, m) in mapels" :key="`mapel-${m}`">
              <tr>
                <!-- <td class="border p-1">{{ m + 1 }}</td> -->
                <td class="border p-1">{{ mapel.label }}</td>
                <template v-for="(nilai, n) in 12" :key="`nilai-${n}`">
                  <td class="border p-1 text-center">
                    {{ Math.floor(Math.random() * (100 - 0) + 0) }}
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
