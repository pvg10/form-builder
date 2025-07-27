import { FieldSchema } from "../types/formSchema";

export const validateField = (field: FieldSchema, value: any): string | null => {
  // ✅ Handle field.required directly
  if (field.required && (value === undefined || value === null || value === '')) {
    return `${field.label} is required`;
  }

  // ✅ Then handle validation array if present
  const rules = field.validation;
  if (!rules || !Array.isArray(rules)) return null;

  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (value === undefined || value === null || value === "") {
          return rule.message;
        }
        break;
      case "minLength":
        if (typeof value === "string" && value.length < (rule.value as number)) {
          return rule.message;
        }
        break;
      case "maxLength":
        if (typeof value === "string" && value.length > (rule.value as number)) {
          return rule.message;
        }
        break;
      case "pattern":
        if (typeof value === "string" && !(new RegExp(rule.value as string).test(value))) {
          return rule.message;
        }
        break;
      case "min":
        if (typeof value === "number" && value < (rule.value as number)) {
          return rule.message;
        }
        break;
      case "max":
        if (typeof value === "number" && value > (rule.value as number)) {
          return rule.message;
        }
        break;
    }
  }

  return null;
};