
<template>
  <div class="space-y-8">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-8 h-8 text-pink-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <h2 class="text-3xl font-bold text-gray-800">Riepilogo Viaggio</h2>
    </div>

    <!-- Trip Information -->
    <section>
      <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Dettagli Viaggio
      </h3>
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-2">
        <p class="text-lg"><strong class="text-gray-700">Titolo:</strong> <span class="text-gray-900">{{ trip.title }}</span></p>
        <p class="text-lg"><strong class="text-gray-700">Destinazione:</strong> <span class="text-gray-900">{{ trip.destination }}, {{ trip.country }}</span></p>
        <p class="text-lg"><strong class="text-gray-700">Date:</strong> <span class="text-gray-900">{{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}</span></p>
        <p class="text-lg"><strong class="text-gray-700">Durata:</strong> <span class="text-gray-900">{{ tripStore.tripDuration }} giorni</span></p>
        <p v-if="trip.flexible" class="text-blue-600 flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Date flessibili
        </p>
        <p v-if="trip.notes" class="text-gray-700 pt-2 border-t">
          <strong>Note:</strong> {{ trip.notes }}
        </p>
      </div>
    </section>

    <!-- Budget Overview -->
    <section>
      <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Riepilogo Budget
      </h3>
      <div :class="[
        'rounded-lg p-6 border-2',
        tripStore.isOverBudget ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
      ]">
        <div class="space-y-3">
          <div class="flex justify-between text-lg">
            <span class="text-gray-700">Budget Totale:</span>
            <span class="font-bold text-gray-900">€{{ trip.totalBudget.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-700">Spese:</span>
            <span class="font-semibold">€{{ tripStore.totalExpenses.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-700">Attività:</span>
            <span class="font-semibold">€{{ tripStore.totalActivities.toFixed(2) }}</span>
          </div>
          <div class="border-t-2 pt-3 flex justify-between text-lg">
            <span class="font-bold text-gray-700">Totale Speso:</span>
            <span class="font-bold text-gray-900">€{{ tripStore.totalSpent.toFixed(2) }}</span>
          </div>
          <div :class="[
            'flex justify-between text-2xl font-bold pt-2 border-t-2',
            tripStore.isOverBudget ? 'text-red-600 border-red-300' : 'text-green-600 border-green-300'
          ]">
            <span>{{ tripStore.isOverBudget ? '⚠️ Fuori Budget:' : '✅ Margine:' }}</span>
            <span>{{ tripStore.isOverBudget ? '-' : '' }}€{{ Math.abs(tripStore.margin).toFixed(2) }}</span>
          </div>
        </div>

        <div v-if="tripStore.isOverBudget" class="mt-4 p-4 bg-red-100 rounded-lg">
          <p class="text-red-800 font-semibold flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            Attenzione! Il budget è stato superato di €{{ Math.abs(tripStore.margin).toFixed(2) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Expenses List -->
    <section v-if="trip.expenses.length > 0">
      <h3 class="text-xl font-bold text-gray-800 mb-3">📋 Spese ({{ trip.expenses.length }})</h3>
      <div class="space-y-2">
        <div
          v-for="expense in trip.expenses"
          :key="expense.id"
          class="flex justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
        >
          <span class="font-semibold text-gray-800">{{ expense.name }}</span>
          <span class="text-blue-600 font-bold">€{{ expense.amount.toFixed(2) }}</span>
        </div>
      </div>
    </section>

    <!-- Activities List -->
    <section v-if="trip.activities.length > 0">
      <h3 class="text-xl font-bold text-gray-800 mb-3">🎯 Attività ({{ trip.activities.length }})</h3>
      <div class="space-y-3">
        <div
          v-for="activity in trip.activities"
          :key="activity.id"
          class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-gray-900 text-lg">{{ activity.title }}</h4>
            <span v-if="activity.cost" class="text-purple-600 font-bold">€{{ activity.cost.toFixed(2) }}</span>
          </div>
          <div class="flex gap-4 text-sm text-gray-600">
            <span v-if="activity.day" class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Giorno {{ activity.day }}
            </span>
          </div>
          <p v-if="activity.notes" class="text-gray-700 mt-2 text-sm">{{ activity.notes }}</p>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <div class="border-t pt-6 space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          @click="handleSave"
          :disabled="tripStore.loading"
          class="flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="!tripStore.loading" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          <svg v-else class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ tripStore.loading ? 'Salvataggio...' : 'Salva Viaggio' }}
        </button>

        <button
          @click="tripStore.exportJSON()"
          class="flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-bold text-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Esporta JSON
        </button>
      </div>

      <button
        @click="tripStore.exportCSV()"
        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Esporta CSV
      </button>
    </div>

    <div v-if="trip.id" class="text-center text-sm text-gray-500">
      <p>ID Viaggio: <code class="bg-gray-100 px-2 py-1 rounded">{{ trip.id }}</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTripStore } from '@/stores/tripStore';

const tripStore = useTripStore();
const trip = computed(() => tripStore.trip);

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

const handleSave = async () => {
  try {
    if (trip.value.id) {
      await tripStore.updateBackend();
      alert('✅ Viaggio aggiornato con successo!');
    } else {
      const id = await tripStore.saveTrip();
      alert(`✅ Viaggio salvato! ID: ${id}`);
    }
  } catch (error) {
    alert('❌ Errore durante il salvataggio. Riprova.');
  }
};
</script>