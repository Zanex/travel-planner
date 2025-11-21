import { defineStore } from 'pinia';
import type { Trip, Expense, Activity, TripState } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const useTripStore = defineStore('trip', {
  state: (): TripState => ({
    currentStep: 1,
    loading: false,
    error: null,
    trip: {
      title: '',
      destination: '',
      country: '',
      notes: '',
      startDate: '',
      endDate: '',
      flexible: false,
      totalBudget: 0,
      expenses: [],
      activities: []
    }
  }),

  getters: {
    totalExpenses: (state): number => 
      state.trip.expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
    
    totalActivities: (state): number =>
      state.trip.activities.reduce((sum, a) => sum + (a.cost || 0), 0),
    
    totalSpent(): number {
      return this.totalExpenses + this.totalActivities;
    },
    
    margin(): number {
      return this.trip.totalBudget - this.totalSpent;
    },
    
    isOverBudget(): boolean {
      return this.margin < 0;
    },

    canProceed(): boolean {
      switch (this.currentStep) {
        case 1: return !!(this.trip.title && this.trip.destination && this.trip.country);
        case 2: return !!(this.trip.startDate && this.trip.endDate);
        case 3: return this.trip.totalBudget > 0;
        case 4: return true;
        case 5: return true;
        default: return false;
      }
    },

    tripDuration(): number {
      if (!this.trip.startDate || !this.trip.endDate) return 0;
      const start = new Date(this.trip.startDate);
      const end = new Date(this.trip.endDate);
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
  },

  actions: {
    updateTrip(updates: Partial<Trip>) {
      this.trip = { ...this.trip, ...updates };
    },

    // Expense Management
    addExpense() {
      const expense: Expense = {
        id: `exp_${Date.now()}`,
        name: '',
        amount: 0
      };
      this.trip.expenses.push(expense);
    },

    updateExpense(id: string, updates: Partial<Expense>) {
      const index = this.trip.expenses.findIndex(e => e.id === id);
      if (index !== -1) {
        this.trip.expenses[index] = { ...this.trip.expenses[index], ...updates };
      }
    },

    removeExpense(id: string) {
      this.trip.expenses = this.trip.expenses.filter(e => e.id !== id);
    },

    // Activity Management
    addActivity() {
      const activity: Activity = {
        id: `act_${Date.now()}`,
        title: ''
      };
      this.trip.activities.push(activity);
    },

    updateActivity(id: string, updates: Partial<Activity>) {
      const index = this.trip.activities.findIndex(a => a.id === id);
      if (index !== -1) {
        this.trip.activities[index] = { ...this.trip.activities[index], ...updates };
      }
    },

    removeActivity(id: string) {
      this.trip.activities = this.trip.activities.filter(a => a.id !== id);
    },

    // Navigation
    nextStep() {
      if (this.canProceed && this.currentStep < 5) {
        this.currentStep++;
        if (this.trip.id) {
          this.updateBackend();
        }
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    goToStep(step: number) {
      if (step >= 1 && step <= 5) {
        this.currentStep = step;
      }
    },

    // API Calls
    async saveTrip(): Promise<string> {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`${API_URL}/trip`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.trip)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to save trip');
        }
        
        const data = await response.json();
        this.trip.id = data.id;
        return data.id;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async loadTrip(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`${API_URL}/trip/${id}`);
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to load trip');
        }
        
        const data = await response.json();
        this.trip = data;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateBackend() {
      if (!this.trip.id) return;
      
      try {
        const response = await fetch(`${API_URL}/trip/${this.trip.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.trip)
        });
        
        if (!response.ok) {
          console.error('Failed to update trip');
        }
      } catch (error) {
        console.error('Error updating trip:', error);
      }
    },

    async deleteTrip(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`${API_URL}/trip/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete trip');
        }
        
        this.resetTrip();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Export
    exportJSON() {
      const data = JSON.stringify(this.trip, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.trip.title.replace(/\s+/g, '-')}-trip.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    exportCSV() {
      let csv = 'Type,Name,Amount,Day,Notes\n';
      
      this.trip.expenses.forEach(e => {
        csv += `Expense,"${e.name}",${e.amount},,\n`;
      });
      
      this.trip.activities.forEach(a => {
        csv += `Activity,"${a.title}",${a.cost || 0},${a.day || ''},"${a.notes || ''}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.trip.title.replace(/\s+/g, '-')}-expenses.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    resetTrip() {
      this.trip = {
        title: '',
        destination: '',
        country: '',
        notes: '',
        startDate: '',
        endDate: '',
        flexible: false,
        totalBudget: 0,
        expenses: [],
        activities: []
      };
      this.currentStep = 1;
      this.error = null;
    }
  }
});
