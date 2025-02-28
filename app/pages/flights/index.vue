<script setup lang="ts">
import type { FlightResponse } from "@types/types";
import { ref, watch, computed } from "vue";

const config = useRuntimeConfig();

const today = new Date().toISOString().split("T")[0];

const searchQuery = ref({
    departure_airport: "",
    arrival_airport: "",
    departure_time: today,
    arrival_time: "",
    flight_type: "oneway",
    travel_class: "Economy",
    passengers: {
        adults: 1, // Default to 1 adult
        children: 0,
        infants: 0
    },
});

const isRoundTrip = computed(() => searchQuery.value.flight_type === "rounded");

const swapAirports = () => {
    const temp = searchQuery.value.departure_airport;
    searchQuery.value.departure_airport = searchQuery.value.arrival_airport;
    searchQuery.value.arrival_airport = temp;
};

const { data, pending, error, refresh } = useAsyncData<FlightResponse>(
    "flights",
    async () => {
        return await $fetch<FlightResponse>(`${config.public.apiBase}/flights`, {
            query: {
                departure_airport: searchQuery.value.departure_airport || undefined,
                arrival_airport: searchQuery.value.arrival_airport || undefined,
                departure_time: searchQuery.value.departure_time || undefined,
                arrival_time: isRoundTrip.value ? searchQuery.value.arrival_time : undefined,
                flight_type: searchQuery.value.flight_type,
                travel_class: searchQuery.value.travel_class,
                available_seats: searchQuery.value.passengers.adults + searchQuery.value.passengers.children,
                passengers: JSON.stringify(searchQuery.value.passengers)
            },
        });
    },
    { watch: [searchQuery] }
);

const searchFlights = async () => {
    await refresh();
};

watch(searchQuery, () => {
    refresh();
}, { deep: true });
</script>

<template>
    <div class="max-w-screen-lg mx-auto relative">
        <div class="pt-5 pb-[60px]">
            <div
                class="search-box bg-[#fafafa] relative w-full shadow-lg rounded-2xl border items-top gap-5 px-3 lg:px-8 pt-10 pb-16">

                <!-- Round Trip / One Way Selection -->
                <div class="flex justify-center gap-5 mb-5">
                    <label class="flex items-center">
                        <input type="radio" v-model="searchQuery.flight_type" value="rounded" /> Round Trip
                    </label>
                    <label class="flex items-center">
                        <input type="radio" v-model="searchQuery.flight_type" value="oneway" /> One Way
                    </label>
                </div>

                <!-- Flying From & Flying To Inputs with Swap Icon -->
                <div class="flex items-center gap-4 relative">
                    <input v-model="searchQuery.departure_airport" type="text" placeholder="Flying From"
                        class="p-inputtext p-component w-full ps-11 py-4 rounded-xl" />

                    <button @click="swapAirports" class="bg-blue-500 text-white p-2 rounded-full shadow-md">
                        🔄
                    </button>

                    <input v-model="searchQuery.arrival_airport" type="text" placeholder="Flying To"
                        class="p-inputtext p-component w-full ps-11 py-4 rounded-xl" />
                </div>

                <!-- Departure & Return Date Selection -->
                <div class="grid grid-cols-2 gap-4 mt-5">
                    <input v-model="searchQuery.departure_time" type="date"
                        class="p-inputtext p-component w-full py-4 rounded-xl" />

                    <input v-model="searchQuery.arrival_time" type="date"
                        class="p-inputtext p-component w-full py-4 rounded-xl" :disabled="!isRoundTrip"
                        placeholder="Return Date" />
                </div>

                <!-- Passenger Selection -->
                <div class="grid grid-cols-3 gap-4 mt-5">
                    <div class="flex flex-col">
                        <label class="font-medium">Adults (12+)</label>
                        <input v-model="searchQuery.passengers.adults" type="number" min="1" max="10"
                            class="p-inputtext p-component w-full py-4 rounded-xl text-center" />
                    </div>
                    <div class="flex flex-col">
                        <label class="font-medium">Children (2-11)</label>
                        <input v-model="searchQuery.passengers.children" type="number" min="0" max="5"
                            class="p-inputtext p-component w-full py-4 rounded-xl text-center" />
                    </div>
                    <div class="flex flex-col">
                        <label class="font-medium">Infants (&lt;2)</label>
                        <input v-model="searchQuery.passengers.infants" type="number" min="0" max="2"
                            class="p-inputtext p-component w-full py-4 rounded-xl text-center" />
                    </div>
                </div>

                <!-- Travel Class Selection -->
                <div class="grid grid-cols-2 gap-4 mt-5">
                    <select v-model="searchQuery.travel_class" class="p-inputtext p-component w-full py-4 rounded-xl">
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>Premium Business</option>
                        <option>First</option>
                        <option>Premium First</option>
                    </select>
                </div>

                <!-- Search Button -->
                <div class="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-full text-center pointer-events-auto">
                    <button @click="searchFlights"
                        class="btn primary-btn btn-wave-animation bg-blue-600 text-white text-lg w-1/2 rounded-[12px] py-3.5 shadow-lg hover:bg-blue-700 transition">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Flight Results -->
    <div v-if="pending" class="text-center">Loading flights...</div>
    <div v-else-if="error" class="text-center text-red-500">Failed to load flights. Please try again.</div>
    <div v-else-if="data?.data?.data && data.data.data.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <FlightCard v-for="flight in data.data.data" :key="flight.id" :flight="flight" />
    </div>
    <div v-else class="text-center">No flights available.</div>

</template>
