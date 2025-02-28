<script setup lang="ts">
import type { Flight } from "@types/types";

defineProps<{
    flight: Flight;
}>();
</script>

<template>
    <div class="w-full" v-if="flight">
        <div class="swiper swiper-initialized swiper-horizontal" clickable="true">
            <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px)">
                <div class="swiper-slide swiper-slide-active swiper-slide-next"
                    style="width: 479px">
                    <div
                        class="relative group cursor-pointer w-full shadow-md border rounded-lg overflow-hidden group hover:shadow-lg duration-300 ease-in-out">
                        <div class="overflow-hidden">
                            <img class="w-full h-[100px] md:h-[190px] object-cover group-hover:scale-[1.1] duration-300"
                                :src="flight.image" />
                        </div>
                        <div class="w-full">
                            <div class="px-3 py-1 md:px-5 md:py-3 relative flex flex-col gap-2 justify-between">
                                <div>
                                    <small class="text-[10px] sm:text-sm md:text-lg">{{ flight.airline }}</small><small
                                        class="block text-[10px] md:text-lg mt-2"><i
                                            class="fa-solid fa-plane opacity-50"></i>🛬{{ flight.departure_airport
                                        }}</small><span
                                        class="text-[9px] md:text-lg flex flex-col items-end w-full"><span
                                            class="block text-[7px] md:text-sm">Start From </span><span
                                            class="text-[10px] md:text-lg">THB
                                            <span class="text-[10px] md:text-lg">{{ flight.price }}</span></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
