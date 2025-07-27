import React from 'react';
import './Modal.css';

interface ModalProps {
  title: string;
  data: Record<string, any>;
  fields: {
    id: string;
    label: string;
    type: string;
    dependsOn?: {
      fieldId: string;
      value: any;
    };
  }[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, data, fields, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="success-message">
          <span className="tick-icon">✅</span> Form submitted successfully!
        </div>

        <h2>{title}</h2>

        <div className="submitted-values">
          {fields.map((field) => {
            if (field.dependsOn) {
              const dependsValue = data[field.dependsOn.fieldId];
              if (dependsValue !== field.dependsOn.value) return null;
            }

            const value = data[field.id];
            const displayValue =
              field.type === 'checkbox' ? (value ? 'Yes' : 'No') : value || '—';

            return (
              <div key={field.id} className="submitted-field">
                <span className="submitted-label">{field.label}:</span>
                <span className="submitted-value">{displayValue}</span>
              </div>
            );
          })}
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
