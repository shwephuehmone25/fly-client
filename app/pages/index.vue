<script setup lang="ts">
import type { HotelResponse } from "../../types/types";

const config = useRuntimeConfig();

const { data, pending, error } = useAsyncData<HotelResponse>(
  "hotels",
  () => $fetch(`${config.public.apiBase}/hotels?limit=12`)
);

// SEO Meta Setup
useSeoMeta({
  title: "Wonderpackage - Find the Best Hotels!",
  description: "Discover top-rated hotels to make your stay perfect.",
  ogTitle: "Wonderpackage",
  ogDescription: "Find the best hotels for your stay!",
  ogImage: "/fly.jpg",
  ogUrl: "https://flystay.wonderfulpackage.com",
  twitterTitle: "Wonderpackage",
  twitterDescription: "Find the best hotels for your stay!",
  twitterImage: "/fly.jpg",
});
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-[#f1f1f1]">
      <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6">
            Master Your Stay: Unlock the Perfect Getaway Today!
          </h1>
          <p class="text-xl lg:text-2xl mb-8">
            Discover Stays That Make Your Getaway Effortless and Comfortable.
          </p>
          <UButton to="#hotels" label="Explore Hotels & Flights" />
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg sizes="xs:100vw sm:667px"
            src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByZXNlcnZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
            format="webp" densities="x1" alt="Hotel image" />
        </div>
      </div>
    </section>

    <!-- Hotels Section -->
    <section id="hotels" class="py-20 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular hotels!</p>

      <!-- Loading State -->
      <div v-if="pending" class="text-xl">Loading hotels...</div>

      <!-- Hotels Grid -->
      <div v-else-if="data?.data?.data?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <HotelCard v-for="hotel in data.data.data" :key="hotel.id" :hotel="hotel" />
      </div>

      <!-- Error Message -->
      <p v-else-if="error" class="text-xl text-red-500">
        Oops, something went wrong. Please try again later.
      </p>

      <!-- No Hotels Found -->
      <p v-else class="text-xl text-gray-500">No hotels found.</p>
    </section>
  </main>
</template>
