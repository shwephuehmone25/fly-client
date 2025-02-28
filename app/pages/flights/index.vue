<script setup lang="ts">
import type { FlightResponse } from "@types/types";

const config = useRuntimeConfig();

const { data, pending, error } = useAsyncData<FlightResponse>(
    "flights",
    () => $fetch(`${config.public.apiBase}/flights?limit=12`)
);
</script>

<template>
    <div v-if="pending" class="text-center">Loading flights...</div>
    <div v-else-if="error" class="text-center text-red-500">Failed to load flights. Please try again.</div>
    <div v-else-if="data?.data?.data?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <FlightCard v-for="flight in data.data.data" :key="flight.id" :flight="flight" />
    </div>
    <div v-else class="text-center">No flights available.</div>
</template>
