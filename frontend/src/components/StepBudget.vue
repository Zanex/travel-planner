
<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2 class="text-3xl font-bold text-gray-800">Pianificazione Budget</h2>
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Budget Totale <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-4 top-3 text-gray-500 text-lg">€</span>
        <input
          v-model.number="trip.totalBudget"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
          required
        />
      </div>
    </div>

    <div class="border-t pt-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-800">Voci di Spesa</h3>
        <button
          @click="tripStore.addExpense()"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Aggiungi Spesa
        </button>
      </div>

      <div v-if="trip.expenses.length === 0" class="text-center py-8 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <p>Nessuna spesa aggiunta. Clicca "Aggiungi Spesa" per iniziare.</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="expense in trip.expenses"
          :key="expense.id"
          class="flex gap-3 items-center bg-gray-50 p-3 rounded-lg"
        >
          <input
            :value="expense.name"
            @input="tripStore.updateExpense(expense.id, { name: ($event.target as HTMLInputElement).value })"
            type="text"
            placeholder="Nome spesa (es. Hotel)"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="relative w-40">
            <span class="absolute left-3 top-2 text-gray-500">€</span>
            <input
              :value="expense.amount"
              @input="tripStore.updateExpense(expense.id, { amount: parseFloat(($event.target as HTMLInputElement).value) || 0 })"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            @click="tripStore.removeExpense(expense.id)"
            class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            title="Rimuovi spesa"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="trip.totalBudget > 0" class="border-t pt-6">
      <div :class="[
        'rounded-lg p-6',
        tripStore.isOverBudget ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'
      ]">
        <h3 class="text-lg font-bold mb-4 text-gray-800">Riepilogo Budget</h3>
        <div class="space-y-2">
          <div class="flex justify-between text-gray-700">
            <span>Budget Totale:</span>
            <span class="font-semibold">€{{ trip.totalBudget.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-700">
            <span>Spese Pianificate:</span>
            <span class="font-semibold">€{{ tripStore.totalExpenses.toFixed(2) }}</span>
          </div>
          <div class="border-t pt-2 flex justify-between text-lg font-bold" :class="tripStore.isOverBudget ? 'text-red-600' : 'text-green-600'">
            <span>{{ tripStore.isOverBudget ? 'Fuori Budget:' : 'Margine:' }}</span>
            <span>{{ tripStore.isOverBudget ? '-' : '' }}€{{ Math.abs(tripStore.margin).toFixed(2) }}</span>
          </div>
        </div>
        
        <div v-if="tripStore.isOverBudget" class="mt-4 p-3 bg-red-100 rounded-lg">
          <p class="text-red-800 text-sm font-semibold flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            Attenzione! Hai superato il budget previsto.
          </p>
        </div>
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