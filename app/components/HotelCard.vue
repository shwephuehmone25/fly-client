<script setup lang="ts">
import type { Hotel } from "../../types/types";

defineProps<{
  hotel: Hotel;
}>();
</script>

<template>
  <div v-if="hotel" class="flex flex-col shadow rounded-md">
    <div class="flex flex-col py-6 px-4 flex-1">
      <!-- Hotel Name -->
      <p class="text-xl lg:text-2xl font-semibold mb-2">{{ hotel.name }}</p>
      <p class="text-lg text-gray-600">{{ hotel.location }}</p>
      
      <!-- Hotel Details -->
      <div class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto">
        <div class="flex items-center gap-1">
          <UIcon name="i-mdi-home" class="text-dodgeroll-gold-500" />
          <span>Total Rooms: {{ hotel.total_rooms }}</span>
        </div>
        <div class="flex items-center gap-1">
          <UIcon name="i-mdi-bed" class="text-dodgeroll-gold-500" />
          <span>Available: {{ hotel.remaining_rooms }}</span>
        </div>
        <div class="flex items-center gap-1">
          <UIcon name="i-mdi-star" class="text-dodgeroll-gold-500" />
          <span>{{ hotel.rating }}</span>
        </div>
      </div>
      
      <!-- Button to View Hotel -->
      <UButton
        :ui="{ base: 'self-start' }"
        :to="`/hotels/${hotel.id}`"
        label="View"
      />
    </div>
  </div>
</template>
