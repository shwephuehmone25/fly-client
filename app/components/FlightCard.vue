<script setup lang="ts">
import type { Flight } from "@types/types";

defineProps<{
    flight: Flight;
}>();
</script>

<template>
    <div v-if="flight" class="flex flex-col shadow rounded-md mt-3">
        <div class="flex flex-col py-6 px-4 flex-1">
            <!-- Flight Destination -->
            <p class="text-xl lg:text-2xl font-semibold mb-2">{{ flight.destination }}</p>
            <p class="text-lg text-gray-600">{{ flight.airline }}</p>

            <!-- Flight Details -->
            <div class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto">
                <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-airplane-takeoff" class="text-blue-500" />
                    <span>Departure: {{ flight.departureTime }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-airplane-landing" class="text-blue-500" />
                    <span>Arrival: {{ flight.arrivalTime }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <UIcon name="i-mdi-cash" class="text-blue-500" />
                    <span>{{ flight.price }}</span>
                </div>
            </div>

            <!-- Button to View Flight -->
            <UButton :ui="{ base: 'self-start' }" :to="`/flights/${flight.id}`" label="View" />
        </div>
    </div>
</template>
