<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import type { HotelResponse } from "../../types/types";

const route = useRoute();
const config = useRuntimeConfig();
const { data, pending, error } = useAsyncData<HotelResponse>(
  "hotels",
  () => $fetch(`${config.public.apiBase}/hotels?limit=12`)
);

//search query params
const searchQuery = ref(route.query.destination || "");
const checkInDate = ref(route.query.checkIn || "2025-03-01");
const checkOutDate = ref(route.query.checkOut || "2025-03-02");
const guests = ref(route.query.guests || "2 Adults, 1 Room");

// Sidebar Filters
const selectedRatings = ref<number[]>([]);
const selectedGuestRatings = ref<number[]>([]);
const budgetMin = ref<number | null>(null);
const budgetMax = ref<number | null>(null);
const sortBy = ref("low-high");

// Guest Rating Options
const guestRatings = [
  { value: 4.5, label: "Amazing 4.5+" },
  { value: 4.0, label: "Great 4.0+" },
  { value: 3.5, label: "Good 3.5+" },
  { value: 3.0, label: "Pleasant 3.0+" },
];

//filter hotels
const filteredHotels = computed(() => {
  let hotels = data.value?.data?.data || [];

  // Filter by search query
  if (searchQuery.value) {
    hotels = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by selected ratings
  if (selectedRatings.value.length) {
    hotels = hotels.filter(hotel => selectedRatings.value.includes(hotel.rating));
  }

  // Filter by budget
  if (budgetMin.value !== null) {
    hotels = hotels.filter(hotel => hotel.price >= budgetMin.value);
  }
  if (budgetMax.value !== null) {
    hotels = hotels.filter(hotel => hotel.price <= budgetMax.value);
  }

  // Sort hotels
  if (sortBy.value === "low-high") {
    hotels = hotels.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "high-low") {
    hotels = hotels.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === "top-rated") {
    hotels = hotels.sort((a, b) => b.rating - a.rating);
  }

  return hotels;
});

//rating filters
const toggleRating = (rating: number) => {
  if (selectedRatings.value.includes(rating)) {
    selectedRatings.value = selectedRatings.value.filter(r => r !== rating);
  } else {
    selectedRatings.value.push(rating);
  }
};

// Sorting
const sortHotels = () => {
  filteredHotels.value;
};
</script>

<template>
  <main class="bg-[#f1f1f1] min-h-screen">
    <!-- Top Bar with Search -->
    <div class="bg-[#0f172a] text-white shadow-md py-4">
      <section class="container flex justify-between items-center">
        <div class="flex items-center w-full space-x-3">
          <input v-model="searchQuery" type="text" placeholder="Search hotels..."
            class="border rounded-md py-2 px-3 w-1/4 focus:outline-none text-black" />
          <input v-model="checkInDate" type="date"
            class="border py-2 px-3 w-1/4 focus:outline-none text-black" />
          <input v-model="checkOutDate" type="date"
            class="border py-2 px-3 w-1/4 focus:outline-none text-black" />
          <input v-model="guests" type="text"
            class="border py-2 px-3 w-1/4 focus:outline-none text-black" />
          <UButton label="Search" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" />
        </div>
      </section>
    </div>

    <!-- Main Content -->
    <section class="container grid grid-cols-4 gap-6 py-6">
      <aside class="col-span-1 bg-white rounded-lg shadow-md p-4">
        <h3 class="font-bold mb-3">Hotel Star Rating</h3>
        <div class="flex space-x-2">
          <button v-for="rating in [2, 3, 4, 5]" :key="rating" @click="toggleRating(rating)"
            :class="['px-3 py-2 rounded-md', selectedRatings.includes(rating) ? 'bg-yellow-400 text-white' : 'bg-gray-200']">
            {{ rating }} ⭐
          </button>
        </div>

        <h3 class="font-bold mt-4 mb-3">Guest Rating</h3>
        <div class="space-y-2">
          <label v-for="rating in guestRatings" :key="rating.value" class="inline-flex items-center">
            <input type="checkbox" v-model="selectedGuestRatings" :value="rating.value"
              class="form-checkbox h-5 w-5 text-blue-600 rounded" />
            <span class="ml-2 text-gray-700">{{ rating.label }}</span>
          </label>
        </div>

        <h3 class="font-bold mt-4 mb-3">Budget (per night)</h3>
        <div class="flex items-center space-x-2">
          <span>฿</span>
          <input v-model.number="budgetMin" type="number" class="border rounded py-2 px-2 w-20" placeholder="Min" />
          <span>- ฿</span>
          <input v-model.number="budgetMax" type="number" class="border rounded py-2 px-2 w-20" placeholder="Max" />
        </div>
      </aside>

      <!-- Hotels List -->
      <div class="col-span-3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Recommended Hotels For You</h2>
          <select v-model="sortBy" @change="sortHotels" class="border rounded py-2 px-3">
            <option value="low-high">Price (Low To High)</option>
            <option value="high-low">Price (High To Low)</option>
            <option value="top-rated">Top Reviewed</option>
          </select>
        </div>

        <!-- Hotels List -->
        <div v-if="pending" class="text-xl text-center">Loading hotels...</div>
        <div v-else-if="filteredHotels.length" class="grid grid-cols-1 gap-6">
          <div v-for="hotel in filteredHotels" :key="hotel.id" class="bg-white rounded-lg shadow-md flex p-4">
            <img :src="hotel.image" alt="Hotel Image" class="w-48 h-48 rounded-lg object-cover" />
            <div class="ml-4 flex-grow">
              <h3 class="font-bold text-lg">{{ hotel.name }}</h3>
              <p class="text-gray-600 text-sm">📍 {{ hotel.location }}</p>
              <p class="text-xl font-bold">THB {{ hotel.price }}</p>
              <UButton label="Check Availability" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" />
            </div>
          </div>
        </div>
        <p v-else class="text-xl text-gray-500 text-center">No hotels found.</p>
      </div>
    </section>
  </main>
</template>
