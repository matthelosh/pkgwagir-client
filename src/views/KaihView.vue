<template>
  <div class="w-screen h-screen relative">
    <ToolBar />
    <div class="wrapper p-4 w-full">
      <h1 class="text-center font-bold text-3xl text-slate-700">Data Pelaskanaan</h1>
      <h3 class="text-center text-lg text-gray-600">Tujuh Kebiasaan Anak Indonesia Hebat</h3>

      <table class="w-full my-4" v-if="user.role == 'siswa'">
        <thead>
          <tr class="bg-sky-200">
            <th class="border-r text-slate-700 px-1 py-2">No</th>
            <th class="border-r text-slate-700 px-1 py-2">Kebiasaan</th>
            <th class="text-slate-700 px-1 py-2">Waktu, tanggal</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, i) in datas" :key="i">
            <tr class="even:bg-sky-50">
              <td class="border-r text-slate-700 px-1 text-center">
                {{ i + 1 }}
              </td>
              <td class="border-r text-slate-700 py-1 px-2">
                {{ data?.kebiasaan ?? '-' }}
              </td>
              <td class="text-slate-700 py-1 px-2">
                {{ dayjs(data?.waktu).locale('id_ID').format('DD MMM YYYY HH:mm') }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-else class="alert flex flex-col gap-3 rounded my-4 bg-orange-100 shadow px-2 py-4">
        <h3 class="text-lg font-bold">Peringatan:</h3>
        <p>Data hanya tampil bagi siswa. Guru dapat melihat di dashboard khusus guru.</p>
      </div>
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
      <button
        class="absolute w-[40px] h-[40px] rounded-full text-xl font-bold text-white red shadow-lg right-4 top-6 bg-red-500 flex items-center justify-center cursor-pointer"
        @click="form_angket = !form_angket"
      >
        <Icon icon="mdi:close" class="text-2xl" />
      </button>
      <div class="box bg-white rounded-lg shadow p-4">
        <h1 class="text-center font-bold text-slate-600 text-2xl">
          Isi Kegiatan Kebiasaan Anak Indonesia Hebat
        </h1>

        <img :src="foto" alt="Foto Siswa" class="rounded-full w-[50%] mx-auto mt-8 shadow" />
        <h3 class="text-center">{{ detail?.nama }}</h3>
        <h3 class="text-center">{{ detail?.foto }}</h3>

        <div class="form flex flex-col gap-4 my-4">
          <div class="flex items-center justify-center gap-2">
            <Icon icon="mdi:calendar" class="text-2xl text-orange-400" />
            <span class="text-sky-700">{{ item.waktu.toLocaleString() }}</span>
          </div>
          <label for="Kebiasaan" class="flex flex-col">
            <span>Kebiasaan:</span>
            <select
              v-model="item.kebiasaan"
              class="border border-slate-600 outline-slate-600 rounded p-2"
            >
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
          <div class="flex justify-center">
            <button
              @click="simpan"
              class="bg-sky-500 text-white px-3 py-2 rounded-lg active:bg-sky-300 uppercase tracking-wide hover:cursor-pointer"
            >
              Simpan
            </button>
          </div>
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
import api, { setAuthToken } from '@/services/api'

import ToolBar from '@/components/ToolBar.vue'
import siswaImg from '@/assets/siswa.png'
import siswiImg from '@/assets/siswi.png'
import siswiIs from '@/assets/siswi_is.png'

interface ItemKebiasaan {
  kebiasaan: string;
  waktu: string;
  siswaId: string;
  rombelId: string;
  keterangan: string;
}

const userStore = useUserStore()
// const { success, error } = useNotification()
const user = userStore
const detail = user.detail
const foto = computed(() => {
  return (
    import.meta.env.VITE_API_BASE_URL.replace('/api', '') + detail?.foto ||
    (detail?.jk == 'Laki-laki' ? siswaImg : detail?.agama == 'Islam' ? siswiIs : siswiImg)
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
  waktu: new Date(),
  siswaId: '',
  rombelId: '',
  keterangan: '',
})
const datas = ref<ItemKebiasaan[]>([])
const todayActivities = computed(() => {
  const acts = datas.value.filter((data) => {
    return dayjs(data?.waktu).format('YYYY-MM-DD') == dayjs(new Date()).format("YYYY-MM-DD")
  })
  return acts
})

const lanjut = () => {
  const sekali = ['Bangun Pagi', 'Tidur Cepat']
  if (sekali.includes(item.value.kebiasaan)) {
    if (todayActivities.value.map(act => act?.kebiasaan).includes(item.value.kebiasaan)) {
            return false
    }
  } else {
  return true;
  }
}

const simpan = async () => {
  // alert('tes')
  if (!lanjut()) {
    notify.error(item.value.kebiasaan + " hanya sekali sehari.")
    return false
  }

  try {
    const response = await api.post('/kaih/store', item.value, {
      params: {
        rombelId: detail?.rombel?.kode,
        siswaId: detail?.nisn,
        semester: '1',
        is_done: '1',
      },
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
    setAuthToken(user.token)
    const response = await api.get('/kaih')
    // console.log(response.data.datas)
    datas.value = response.data.datas
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await getRecords()
})
</script>
