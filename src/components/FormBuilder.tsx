import React, { useState } from 'react';
import { FormSchema, FieldSchema } from '../types/formSchema';
import { useFormStore } from '../store/formStore';
import { validateField } from '../utils/validation';
import TextField from './fields/TextField';
import SelectField from './fields/SelectField';
import Modal from './common/Modal';
import './FormBuilder.css';

const FormBuilder = ({ schema }: { schema: FormSchema }) => {
  const { formData, updateField } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleChange = (field: FieldSchema, value: any) => {
  if (field.type === 'number') {
    if (value === '' || value === '-') {
      updateField(field.id, value); // let the user keep typing
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        updateField(field.id, num); // only store valid numbers
      }
    }
  } else {
    updateField(field.id, value);
  }

  setErrors((prev) => ({ ...prev, [field.id]: '' }));
};


  const resetForm = () => {
    schema.fields.forEach(field => {
      updateField(field.id, field.type === 'checkbox' ? false : '');
    });
    setErrors({});
    setSubmittedData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let valid = true;
    let newErrors: Record<string, string> = {};

    schema.fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        valid = false;
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);

    if (valid) {
      const snapshot = { ...formData };
      setTimeout(() => {
        setSubmittedData(snapshot); // only store here, no reset yet
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">{schema.title}</h2>

        <form onSubmit={handleSubmit} className="form-layout">
          {schema.fields.map(field => {
            if (field.dependsOn) {
              const dependsValue = formData[field.dependsOn.fieldId];
              if (dependsValue !== field.dependsOn.value) return null;
            }

            const commonProps = {
              field,
              value: formData[field.id],
              onChange: (val: any) => handleChange(field, val),
              error: errors[field.id],
            };

            switch (field.type) {
              case "text":
              case "number":
              case "date":
                return (
                  <div key={field.id} className="form-group">
                    <TextField {...commonProps} />
                  </div>
                );
              case "select":
                return (
                  <div key={field.id} className="form-group">
                    <SelectField {...commonProps} />
                  </div>
                );
              case "checkbox":
                return (
                  <div key={field.id} className="form-group checkbox-wrapper">
                    <label htmlFor={field.id} className="checkbox-label">
                      <input
                        id={field.id}
                        type="checkbox"
                        checked={!!formData[field.id]}
                        onChange={(e) => handleChange(field, e.target.checked)}
                        className="checkbox-input"
                      />
                      {field.label}
                    </label>
                    {errors[field.id] && <div className="error-text">{errors[field.id]}</div>}
                  </div>
                );
              default:
                return null;
            }
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
          >
            {isSubmitting ? schema.submitButton.loadingText : schema.submitButton.text}
          </button>

          <button
            type="button"
            className="reset-button"
            onClick={resetForm}
          >
            Reset
          </button>
        </form>
      </div>

      {submittedData && (
        <Modal
          title="Submitted Data"
          data={submittedData}
          fields={schema.fields}
          onClose={() => {
            resetForm(); // Reset ONLY after modal closes
          }}
        />
      )}
    </>
  );
};

export default FormBuilder;
