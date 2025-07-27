import { FieldSchema } from '../../types/formSchema';

type Props = {
  field: FieldSchema;
  value: any;
  onChange: (val: any) => void;
  error?: string;
};

const SelectField = ({ field, value, onChange, error }: Props) => (
  <div>
    <label className={field.required ? 'required' : ''}>{field.label}</label>
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
      <option value="">-- Select --</option>
      {field.options?.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <div className="error">{error}</div>}
  </div>
);

export default SelectField;