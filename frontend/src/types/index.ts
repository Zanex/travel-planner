export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export interface Activity {
  id: string;
  title: string;
  day?: number;
  cost?: number;
  notes?: string;
}

export interface Trip {
  id?: string;
  title: string;
  destination: string;
  country: string;
  notes?: string;
  startDate: string;
  endDate: string;
  flexible: boolean;
  totalBudget: number;
  expenses: Expense[];
  activities: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TripState {
  currentStep: number;
  trip: Trip;
  loading: boolean;
  error: string | null;
}