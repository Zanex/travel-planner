
<template>
  <div class="bg-white rounded-xl shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div v-for="step in steps" :key="step.number" class="flex items-center">
        <div
          :class="[
            'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all',
            currentStep === step.number
              ? 'bg-blue-500 text-white scale-110'
              : currentStep > step.number
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-500'
          ]"
        >
          <svg v-if="currentStep > step.number" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span v-else>{{ step.number }}</span>
        </div>
        
        <div
          v-if="step.number < 5"
          :class="[
            'w-16 h-1 mx-2 transition-all',
            currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
          ]"
        />
      </div>
    </div>
    
    <div class="text-center">
      <p class="text-lg font-semibold text-gray-700">
        {{ steps[currentStep - 1].title }}
      </p>
      <p class="text-sm text-gray-500 mt-1">
        {{ steps[currentStep - 1].description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTripStore } from '@/stores/tripStore';

const tripStore = useTripStore();
const currentStep = computed(() => tripStore.currentStep);

const steps = [
  { number: 1, title: 'Informazioni Viaggio', description: 'Titolo, destinazione e dettagli' },
  { number: 2, title: 'Date', description: 'Quando partite?' },
  { number: 3, title: 'Budget', description: 'Pianifica le spese' },
  { number: 4, title: 'Attività', description: 'Cosa farete?' },
  { number: 5, title: 'Riepilogo', description: 'Controlla tutto e salva' }
];
</script>