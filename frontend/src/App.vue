<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <header class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-3">
          <svg class="w-10 h-10 text-pink-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Our Travel Planner</h1>
        </div>
        <p class="text-gray-600 text-lg">Pianifica il viaggio perfetto insieme ✈️</p>
      </header>

      <!-- Progress Bar -->
      <ProgressBar />

      <!-- Error Message -->
      <div v-if="tripStore.error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        ❌ {{ tripStore.error }}
      </div>

      <!-- Step Content -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <Transition name="slide-fade" mode="out-in">
          <StepInfo v-if="tripStore.currentStep === 1" key="step1" />
          <StepDate v-else-if="tripStore.currentStep === 2" key="step2" />
          <StepBudget v-else-if="tripStore.currentStep === 3" key="step3" />
          <StepActivities v-else-if="tripStore.currentStep === 4" key="step4" />
          <Summary v-else-if="tripStore.currentStep === 5" key="step5" />
        </Transition>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center">
        <button
          @click="tripStore.prevStep()"
          :disabled="tripStore.currentStep === 1"
          class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Indietro
        </button>

        <button
          @click="tripStore.nextStep()"
          :disabled="tripStore.currentStep === 5 || !tripStore.canProceed"
          class="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all"
        >
          Avanti
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTripStore } from '@/stores/tripStore';
import ProgressBar from '@/components/ProgressBar.vue';
import StepInfo from '@/components/StepInfo.vue';
import StepDate from '@/components/StepDate.vue';
import StepBudget from '@/components/StepBudget.vue';
import StepActivities from '@/components/StepActivities.vue';
import Summary from '@/components/Summary.vue';

const tripStore = useTripStore();
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>