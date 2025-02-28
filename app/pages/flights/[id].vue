<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hotelData = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/hotels/${route.params.id}`);
    const data = await response.json();

    if (data?.message !== 'Hotel retrieved successfully.') {
      throw new Error('Failed to retrieve hotel data');
    }

    hotelData.value = data.data;
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<template>
  <div class="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
    <!-- Hotel Image -->
    <div class="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
      <img
        :src="hotelData?.image_url || 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D'"
        alt="hotel-image" class="h-full w-full rounded-md md:rounded-lg object-cover" />
    </div>

    <!-- Hotel Details -->
    <div class="p-6">
      <!-- Hotel Type (e.g., 'STARTUP' replaced with 'Hotel') -->
      <div
        class="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
        {{ hotelData?.type || 'Hotel' }}
      </div>

      <!-- Hotel Name -->
      <h4 class="mb-2 text-slate-800 text-xl font-semibold">
        {{ hotelData?.name }}
      </h4>

      <!-- Hotel Description -->
      <p class="mb-8 text-slate-600 leading-normal font-light">
        {{ hotelData?.description }}
      </p>

      <!-- Hotel Location, Rooms, and Rating -->
      <div class="mb-4">
        <p class="text-sm text-slate-600">Location: {{ hotelData?.location }}</p>
        <p class="text-sm text-slate-600">Total Rooms: {{ hotelData?.total_rooms }}</p>
        <p class="text-sm text-slate-600">Available Rooms: {{ hotelData?.remaining_rooms }}</p>
        <p class="text-sm text-slate-600">Rating: {{ hotelData?.rating }} Stars</p>
      </div>

      <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Reserve
        </button>
      </div>
    </div>
  </div>

  <!-- Error Handling -->
  <p v-if="error" class="text-xl text-red-500">{{ error }}</p>
  <p v-else-if="!hotelData" class="text-xl">Loading...</p>
</template>
