import { create } from "zustand";

type AppliedFilter = {
  id: number;
  filters: string;
  sortOrder: string;
};

type FilterState = {
  isOpen: boolean;
  filters: string;
  sortOrder: string;
  appliedFilters: AppliedFilter[];
  openFilter: () => void;
  closeFilter: () => void;
  setFilters: (filters: string) => void;
  setSortOrder: (sortOrder: string) => void;
  addAppliedFilter: (filters: string, sortOrder: string) => void;
  applyStoredFilter: (id: number) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  isOpen: false,
  filters: "",
  sortOrder: "",
  appliedFilters: [],

  openFilter: () => set({ isOpen: true }),
  closeFilter: () => set({ isOpen: false }),
  setFilters: (filters) => set({ filters }),
  setSortOrder: (sortOrder) => set({ sortOrder }),

  addAppliedFilter: (filters, sortOrder) =>
    set((state) => ({
      appliedFilters: [
        ...state.appliedFilters,
        { id: state.appliedFilters.length + 1, filters, sortOrder },
      ],
    })),

  applyStoredFilter: (id) => {
    const storedFilter = get().appliedFilters.find((f) => f.id === id);
    if (storedFilter) {
      set({ filters: storedFilter.filters, sortOrder: storedFilter.sortOrder });
    }
  },

  resetFilters: () => set({ filters: "", sortOrder: "", appliedFilters: [] }),
}));
