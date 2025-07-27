// store/formStore.ts
import { create } from 'zustand';
import { FormSchema } from '../types/formSchema';

type FormData = Record<string, any>;

interface FormStore {
  formData: FormData;
  schema: FormSchema | null;
  loading: boolean;
  updateField: (fieldId: string, value: any) => void;
  resetForm: () => void;
  fetchSchema: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {},
  schema: null,
  loading: true,
  updateField: (fieldId, value) =>
    set((state) => ({
      formData: { ...state.formData, [fieldId]: value },
    })),
  resetForm: () => set({ formData: {} }),
  fetchSchema: async () => {
    set({ loading: true });
    try {
      const res = await fetch("https://sharejson.com/api/v1/uzjxOUc_5VccqT-1XiEYf");
      const data = await res.json();
      set({ schema: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch schema", err);
      set({ loading: false });
    }
  }
}));