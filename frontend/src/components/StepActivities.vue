
<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
      <h2 class="text-3xl font-bold text-gray-800">Attività e Esperienze</h2>
    </div>

    <button
      @click="tripStore.addActivity()"
      class="w-full px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold text-lg flex items-center justify-center gap-2"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      Aggiungi Attività
    </button>

    <div v-if="trip.activities.length === 0" class="text-center py-12 text-gray-500">
      <svg class="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-lg">Nessuna attività pianificata ancora.</p>
      <p class="text-sm">Aggiungi le cose che volete fare durante il viaggio!</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="(activity, index) in trip.activities"
        :key="activity.id"
        class="border-2 border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-all"
      >
        <div class="flex items-start justify-between mb-3">
          <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Attività #{{ index + 1 }}
          </span>
          <button
            @click="tripStore.removeActivity(activity.id)"
            class="text-red-500 hover:text-red-700 transition-colors"
            title="Rimuovi attività"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>

        <div class="space-y-3">
          <input
            :value="activity.title"
            @input="tripStore.updateActivity(activity.id, { title: ($event.target as HTMLInputElement).value })"
            type="text"
            placeholder="Titolo attività (es. Visita agli Uffizi)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
          />

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Giorno (opzionale)</label>
              <input
                :value="activity.day"
                @input="tripStore.updateActivity(activity.id, { day: parseInt(($event.target as HTMLInputElement).value) || undefined })"
                type="number"
                min="1"
                placeholder="es. 1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Costo (opzionale)</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-gray-500">€</span>
                <input
                  :value="activity.cost"
                  @input="tripStore.updateActivity(activity.id, { cost: parseFloat(($event.target as HTMLInputElement).value) || undefined })"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Note (opzionale)</label>
            <textarea
              :value="activity.notes"
              @input="tripStore.updateActivity(activity.id, { notes: ($event.target as HTMLInputElement).value })"
              placeholder="Aggiungi dettagli, orari, o altre informazioni..."
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="tripStore.totalActivities > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-semibold">Costo Totale Attività:</span>
        <span class="text-blue-700 text-xl font-bold">€{{ tripStore.totalActivities.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTripStore } from '@/stores/tripStore';

const tripStore = useTripStore();
const trip = computed(() => tripStore.trip);
</script>