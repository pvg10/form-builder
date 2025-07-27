export type FieldType = "text" | "number" | "select" | "checkbox" | "date";

export interface FieldOption {
  label: string;
  value: string;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max';
  value?: number | string;
  message: string;
}

export interface FieldSchema {
  id: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  validation?: ValidationRule[];
  dependsOn?: {
    fieldId: string;
    condition: 'equals';
    value: string | boolean;
  };
  placeholder?: string;
  required?: boolean;
}

export interface FormSchema {
  title: string;
  fields: FieldSchema[];
  submitButton: {
    text: string;
    loadingText: string;
  };
}