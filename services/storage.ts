
import { AppState } from '../types';

const STORAGE_KEY = 'poultry_erp_state_v2';

const emptyState: AppState = {
  customers: [],
  farms: [],
  accounts: [
    { id: 1, name: 'Cash in Hand', type: 'cash', initialBalance: 0 },
    { id: 2, name: 'Bank Account', type: 'bank', initialBalance: 0 }
  ],
  sales: [],
  receivables: [],
  vouchers: [],
};

export const loadState = (): AppState => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return emptyState;
    const loaded = JSON.parse(serialized);
    // Migration for existing data to ensure accounts exist
    if (!loaded.accounts) loaded.accounts = emptyState.accounts;
    return loaded;
  } catch (e) {
    console.error("Failed to load state", e);
    return emptyState;
  }
};

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};
