<template>
    <div class="bg-white shadow-lg rounded p-6 flex flex-col items-center">
        <input type="text" placeholder="Where to?" class="border p-3 rounded mb-3 w-full" />
        <div class="flex space-x-2 w-full">
            <input type="date" class="border p-3 rounded w-1/2" />
            <input type="date" class="border p-3 rounded w-1/2" />
        </div>
        <div class="flex space-x-2 w-full mt-3">
            <select class="border p-3 rounded w-1/2">
                <option>1 Room</option>
                <option>2 Rooms</option>
            </select>
            <select class="border p-3 rounded w-1/2">
                <option>1 Guest</option>
                <option>2 Guests</option>
            </select>
        </div>
        <button class="bg-blue-600 text-white px-6 py-3 mt-4 rounded">Search</button>
    </div>
</template>