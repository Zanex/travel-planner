
<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <h2 class="text-3xl font-bold text-gray-800">Date del Viaggio</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Data di Inizio <span class="text-red-500">*</span>
        </label>
        <input
          v-model="trip.startDate"
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Data di Fine <span class="text-red-500">*</span>
        </label>
        <input
          v-model="trip.endDate"
          type="date"
          :min="trip.startDate"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <input
          v-model="trip.flexible"
          type="checkbox"
          id="flexible"
          class="mt-1 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="flexible" class="text-sm text-gray-700 cursor-pointer">
          <span class="font-semibold">Date flessibili</span>
          <p class="text-gray-600 mt-1">
            Le date possono variare di qualche giorno in base a disponibilità e prezzi
          </p>
        </label>
      </div>
    </div>

    <div v-if="tripStore.tripDuration > 0" class="bg-green-50 border border-green-200 rounded-lg p-4">
      <p class="text-green-700 font-semibold">
        🗓️ Durata: {{ tripStore.tripDuration }} {{ tripStore.tripDuration === 1 ? 'giorno' : 'giorni' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTripStore } from '@/stores/tripStore';

const tripStore = useTripStore();
const trip = computed(() => tripStore.trip);
</script>