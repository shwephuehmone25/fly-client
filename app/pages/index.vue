<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import type { HotelResponse } from "../../types/types";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/css";
import { Icon } from "@iconify/vue";

const router = useRouter();
const config = useRuntimeConfig();

// Fetch hotel data
const { data, pending, error } = useAsyncData<HotelResponse>(
  "hotels",
  () => $fetch(`${config.public.apiBase}/hotels?limit=12`)
);

// Reactive states
const activeTab = ref("hotels");
const destination = ref("");
const checkInDate = ref("2025-03-01");
const checkOutDate = ref("2025-03-02");
const roomCount = ref(1);
const guestCount = ref(2);

// Extract hotel names
const hotelOptions = computed(() => {
  return data.value?.data?.data?.map(hotel => hotel.name) || [];
});

// Redirect to the search page
const searchHotels = () => {
  router.push({
    path: "/hotels/search",
    query: {
      destination: destination.value,
      checkIn: checkInDate.value,
      checkOut: checkOutDate.value,
      guests: `${guestCount.value} Adults, ${roomCount.value} Room`,
    },
  });
};

// Room increment/decrement
function incrementRoom() {
  roomCount.value++;
}
function decrementRoom() {
  if (roomCount.value > 1) {
    roomCount.value--;
  }
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[600px] overflow-hidden">
      <NuxtImg src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
        alt="Hero Background" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black opacity-40"></div>

      <div class="container relative z-10 flex flex-col items-center justify-center h-full">
        <!-- Tab Navigation -->
        <div class="flex bg-white rounded-full shadow-md p-2 mb-6">
          <button @click="activeTab = 'flights'"
            :class="['px-6 py-3 rounded-full font-semibold flex items-center', activeTab === 'flights' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100']">
            <Icon name="mdi:airplane" class="inline-block mr-1" /> Flights
          </button>
          <button @click="activeTab = 'hotels'"
            :class="['px-6 py-3 rounded-full font-semibold flex items-center', activeTab === 'hotels' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100']">
            <Icon name="mdi:hotel" class="inline-block mr-1" /> Hotels
          </button>
        </div>

        <!-- Search Form -->
        <div v-if="activeTab === 'hotels'" class="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-4xl">
          <div class="grid grid-cols-1 gap-4 items-center">
            <!-- Searchable Destination Field with Icon -->
            <div class="relative">
              <label class="block text-gray-700 text-sm font-bold mb-2">Where to?</label>
              <div class="relative">
                <USelectMenu v-model="destination" :options="hotelOptions" searchable placeholder="Select a hotel"
                  class="w-full pl-10" />
                <Icon name="mdi:magnify" class="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mt-4">
            <!-- Check-in Date -->
            <div class="relative">
              <label class="block text-gray-700 text-sm font-bold mb-2">Check In</label>
              <div class="relative">
                <input v-model="checkInDate" type="date"
                  class="w-full border rounded pl-10 py-2 px-3 text-gray-700 focus:outline-none" />
                <Icon name="mdi:calendar" class="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>

            <!-- Check-out Date -->
            <div class="relative">
              <label class="block text-gray-700 text-sm font-bold mb-2">Check Out</label>
              <div class="relative">
                <input v-model="checkOutDate" type="date"
                  class="w-full border rounded pl-10 py-2 px-3 text-gray-700 focus:outline-none" />
                <Icon name="mdi:calendar" class="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>

            <!-- Room Selection -->
            <div class="relative">
              <label class="block text-gray-700 text-sm font-bold mb-2">Room</label>
              <div class="flex items-center border rounded px-2 py-2">
                <button @click="decrementRoom" class="px-3">-</button>
                <span class="px-3">{{ roomCount }}</span>
                <button @click="incrementRoom" class="px-3">+</button>
              </div>
            </div>

            <!-- Guests Selection -->
            <div class="relative">
              <label class="block text-gray-700 text-sm font-bold mb-2">Guests</label>
              <div class="border rounded px-4 py-2 flex items-center">
                <input v-model="guestCount" type="number" min="1"
                  class="w-full text-center bg-transparent text-gray-700 focus:outline-none" />Adults
              </div>
            </div>
          </div>

          <!-- Search Button -->
          <button @click="searchHotels"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6 w-full">
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Hotels Section -->
    <section id="hotels" class="py-10 container">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold">Recommended Hotels For You</h2>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-xl">Loading hotels...</div>

      <!-- Filtered Hotels Carousel -->
      <div v-else-if="data?.data?.data?.length">
        <Splide :options="{ perPage: 4, gap: '1rem', pagination: false, arrows: true }">
          <SplideSlide v-for="hotel in data.data.data" :key="hotel.id">
            <div class="shadow-md rounded-md overflow-hidden">
              <NuxtImg :src="hotel.image" :alt="hotel.name" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-1">{{ hotel.name }}</h3>
                <div class="flex items-center mb-2 text-sm">
                  <div class="text-blue-500 font-semibold">{{ hotel.rating }}/5</div>
                  <div class="ml-1 text-gray-500">({{ hotel.reviewCount }} reviews)</div>
                </div>
                <div class="text-gray-700 text-sm mb-2">
                  <Icon name="material-symbols:location-on" class="mr-1 text-gray-500" size="16" />
                  {{ hotel.location }}
                </div>
                <div class="flex items-center justify-end">
                  <span class="text-blue-500 font-semibold">THB {{ hotel.price }}</span>
                  <span class="text-gray-500 text-sm">Avg price per night</span>
                </div>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>

      <!-- No Results -->
      <p v-else class="text-xl text-gray-500">No hotels found for "{{ destination }}".</p>
    </section>
  </main>
</template>
