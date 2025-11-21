
<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <h2 class="text-3xl font-bold text-gray-800">Informazioni Viaggio</h2>
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Titolo del Viaggio <span class="text-red-500">*</span>
      </label>
      <input
        v-model="trip.title"
        type="text"
        placeholder="es. La nostra avventura in Toscana"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        required
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Destinazione <span class="text-red-500">*</span>
        </label>
        <input
          v-model="trip.destination"
          type="text"
          placeholder="es. Firenze"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Paese <span class="text-red-500">*</span>
        </label>
        <input
          v-model="trip.country"
          type="text"
          placeholder="es. Italia"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Note (opzionale)
      </label>
      <textarea
        v-model="trip.notes"
        placeholder="Aggiungi dettagli, preferenze o note speciali..."
        rows="4"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTripStore } from '@/stores/tripStore';

const tripStore = useTripStore();
const trip = computed(() => tripStore.trip);
</script>