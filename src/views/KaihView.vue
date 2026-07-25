<template>
  <div class="w-screen h-screen relative">
    <div class="wrapper p-4 w-full relative">
      <router-link to="/dashboard">
        <Icon icon="lucide:arrow-left" />
      </router-link>
      <h1 class="text-center font-bold text-xl text-slate-700">Data Pelaskanaan</h1>
      <h3 class="text-center text-gray-600 text-sm">Tujuh Kebiasaan Anak Indonesia Hebat</h3>
      <h3 class="text-center text-gray-600 font-semibold text-xs">{{ detail?.nama }}</h3>

      <table class="table table-zebra table-sm w-full my-4">
        <thead>
          <tr class="bg-slate-200">
            <th class="px-2 border border-slate-400 text-slate-700">No</th>
            <th class="px-2 border border-slate-400 text-slate-700">Kebiasaan</th>
            <th class="px-2 border border-slate-400 text-slate-700">Waktu, tanggal</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, i) in datas" :key="i" v-if="datas.length > 0">
            <tr>
              <td class="border border-slate-400 text-slate-700 text-center">
                {{ i + 1 }}
              </td>
              <td class="border border-slate-400 text-slate-700">
                {{ data?.kebiasaan ?? '-' }}
              </td>
              <td class="border border-slate-400 text-slate-700">
                {{ dayjs(data?.createdAt).locale('id_ID').format('DD MMM YYYY HH:mm') }}
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3">
              <div class="alert alert-warning">Belum ada data</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="datas.length > 0">
        <!--        {{dayjs(datas[0].waktu).format("YYYY-MM-DD")}} | {{dayjs(new
  Date()).format("YYYY-MM-DD")}} -->
      </div>
    </div>
    <button
      class="fixed w-[60px] h-[60px] rounded-full text-xl font-bold text-white bg-sky-400 shadow right-8 bottom-8 cursor-pointer hover:shadow-lg transition-all duration-300"
      @click="showAngket"
    >
      +
    </button>
    <!-- Dialog Form -->
    <div
      class="overlay dialog fixed top-0 right-0 bottom-0 left-0 bg-[#34347466] backdrop-blur z-40 p-4 flex items-center justify-center"
      @click.self="form_angket = !form_angket"
      v-if="form_angket"
    >
      <!-- <button
        class="absolute w-[40px] h-[40px] rounded-full text-xl font-bold text-white red shadow-lg right-4 top-6 bg-red-500 flex items-center justify-center cursor-pointer"
        @click="form_angket = !form_angket"
      >
        <Icon icon="mdi:close" class="text-2xl" />
      </button> -->
      <div class="card bg-white rounded-lg shadow">
        <div class="card-body form flex flex-col gap-4">
          <h1 class="text-center font-bold text-slate-600 text-2xl">
            {{ detail?.nama }}
          </h1>

          <img
            :src="item.kebiasaan === 'pilih' ? foto : `/${item.kebiasaan}.png`"
            alt="Foto Siswa"
            class="w-[50%] mx-auto"
          />
          <div class="flex items-center justify-center gap-2">
            <input type="date" id="datetime" step="1" v-model="item.waktu" class="input" />
          </div>
          <label for="Kebiasaan" class="flex flex-col w-full">
            <span>Kebiasaan:</span>
            <select v-model="item.kebiasaan" class="select w-full">
              <option value="pilih">Pilih Kebiasaan</option>
              <template v-for="(habit, k) in kebiasaans" :key="k">
                <option :value="habit">{{ habit }}</option>
              </template>
            </select>
          </label>
          <label for="Keterangan" class="flex flex-col">
            <span>Keterangan:</span>
            <textarea
              class="border p-2 rounded"
              placeholder="Isi Keterangan [boleh kosong]"
              v-model="item.keterangan"
            >
            </textarea>
          </label>
        </div>
        <div class="card-actions py-4 px-6 flex justify-between">
          <button @click="form_angket = !form_angket" class="btn btn-error btn-ghost">Batal</button>
          <button @click="simpan" class="btn btn-primary">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
dayjs.locale('id_ID')
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user'
import notify from '@/composables/useNotification'
// import axios from 'axios'
import { api } from '@/services/api'

import ToolBar from '@/components/ToolBar.vue'
import siswaImg from '@/assets/siswa.png'
import siswiImg from '@/assets/siswi.png'
import siswiIs from '@/assets/siswi_is.png'

interface ItemKebiasaan {
  kebiasaan: string
  waktu: string
  siswaId: string
  rombelId: string
  keterangan: string
  createdAt: string
}

const userStore = useUserStore()
// const { success, error } = useNotification()
const user = userStore
const detail = user.detail
const foto = computed(() => {
  return (
    detail?.foto ||
    (detail?.jenis_kelamin == 'Laki-laki'
      ? siswaImg
      : detail?.agama == 'Islam'
        ? siswiIs
        : siswiImg)
  )
})

const form_angket = ref(false)
const showAngket = () => {
  if (user.role == 'siswa') {
    form_angket.value = true
  } else {
    notify.error('Hanya siswa/ortu yang boleh mengisi.')
  }
}
const kebiasaans = ref([
  'Bangun Pagi',
  'Beribadah',
  'Berolahraga',
  'Makan Sehat dan Bergizi',
  'Gemar Belajar',
  'Bermasyarakat',
  'Tidur Cepat',
])

const item = ref({
  kebiasaan: 'pilih',
  waktu: dayjs(new Date()).locale('id').format('YYYY-MM-DD'),
  siswaId: '',
  rombelId: '',
  keterangan: '',
})
const datas = ref<ItemKebiasaan[]>([])
const todayActivities = computed(() => {
  const acts = datas.value.filter((data) => {
    return dayjs(data?.waktu).format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD')
  })
  return acts
})

const lanjut = () => {
  // console.log(todayActivities.value)
  const sekali = ['Bangun Pagi', 'Tidur Cepat']
  if (sekali.includes(item.value.kebiasaan)) {
    if (todayActivities.value.map((act) => act?.kebiasaan).includes(item.value.kebiasaan)) {
      return false
    }
    return true
  } else {
    return true
  }
}

const simpan = async () => {
  // alert('tes')
  if (!lanjut()) {
    notify.error(item.value.kebiasaan + ' hanya sekali sehari.')
    return false
  }

  try {
    console.log(detail)
    const response = await api(`/kaih/store/${detail?.rombel[0]?.id}/${detail?.id}`, {
      method: 'POST',
      body: item.value,
    })
    if (response) {
      notify.success('Data Disimpan')
      await getRecords()
      form_angket.value = false
    }
  } catch (err) {
    notify.error(`Error: ${err}`)
  }
}

const getRecords = async () => {
  try {
    // setAuthToken(user.token)
    const response = await api(`/kaih/${detail?.rombel[0]?.id}/${detail?.id}`, {
      method: 'GET',
    })
    console.log(response)
    datas.value = response.kaihs
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getRecords()
})
</script>
