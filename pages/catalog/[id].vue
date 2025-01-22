<script setup lang="ts">
const { id } = useRoute().params

const { data: apiData } = await useFetch('/api/catalog?id=' + id)

const catalogData = computed(() => apiData.value?.data)

const imgPreview = ref<string>()
const isPreviewVisible = ref(false)

const onImageClick = (imgUrl: string) => {
  imgPreview.value = imgUrl
  isPreviewVisible.value = true
}
const closePreview = () => {
  isPreviewVisible.value = false
}
</script>

<template>
  <div class="p-4 max-w-7xl mx-auto box-border">
    <h1 class="text-3xl font-bold mb-6">{{ catalogData?.name }}</h1>
    <div class="mb-6">
      <div v-html="catalogData?.description"></div>
    </div>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-18">
            产品编号
          </th>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-50">图片</th>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-50">名称</th>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-18">价格</th>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-18">库存</th>
          <th class="border border-solid border-gray-300 px-4 py-2 bg-gray-100 min-w-18">备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in catalogData?.items" :key="item.id">
          <td class="border border-solid border-gray-300 px-4 py-2 text-center">{{ item.id }}</td>
          <td class="border border-solid border-gray-300 px-4 py-2">
            <img
              v-if="item.imageList[0]"
              :src="item.imageList[0]"
              alt="Product Image"
              class="w-24 h-24 object-cover rounded-lg mr-1"
              @click="onImageClick(item.imageList[0])"
            />
            <img
              v-if="item.imageList[1]"
              :src="item.imageList[1]"
              alt="Product Image"
              class="w-24 h-24 object-cover rounded-lg"
              @click="onImageClick(item.imageList[1])"
            />
          </td>
          <td class="border border-solid border-gray-300 px-4 py-2">
            <div class="text-sm color-gray">【{{ item.brandName }}】</div>
            <div>
              {{ item.name }}
            </div>
          </td>
          <td class="border border-solid border-gray-300 px-4 py-2 font-bold text-red-5 text-right">
            {{ item.price?.toFixed(2) }} 元
          </td>
          <td class="border border-solid border-gray-300 px-4 py-2 text-center">
            {{ item.inventory > 0 ? item.inventory + ' 件' : '售罄' }}
          </td>
          <td class="border border-solid border-gray-300 px-4 py-2">{{ item.remarks }}</td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="isPreviewVisible"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      @click="closePreview"
    >
      <div class="bg-white p-4 rounded-lg relative" @click.stop>
        <div
          class="absolute top-2 right-2 p-2 bg-white text-gray-500 hover:text-gray-700 focus:outline-none transition duration-300 ease-in-out"
          @click="closePreview"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <img
          :src="imgPreview"
          alt="Product Image"
          class="max-w-[80vw] max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
