import { FieldSchema } from '../../types/formSchema';

type Props = {
  field: FieldSchema;
  value: any;
  onChange: (val: any) => void;
  error?: string;
};

const TextField = ({ field, value, onChange, error }: Props) => {
  const inputType = field.type === 'number' || field.type === 'date' ? field.type : 'text';
  const minDate = field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (field.type === 'number') {
      if (raw === '') {
        onChange('');
        return;
      }
      const num = Number(raw);
      if (isNaN(num) || num < 0) return;
      onChange(num);
    } else if (field.type === 'text') {
      // Allow only alphabets (A-Z, a-z) and spaces
      const alphaRegex = /^[A-Za-z\s]*$/;
      if (alphaRegex.test(raw)) {
        onChange(raw);
      }
    } else {
      onChange(raw);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <label className={field.required ? 'required' : ''}>{field.label}</label>
      <input
        id={field.id}
        type={inputType}
        value={value ?? ''}
        onChange={handleChange}
        {...(field.type === 'date' ? { min: minDate } : {})}
        {...(field.type === 'number' ? { min: 0 } : {})}
        style={{
          padding: '0.6rem 0.8rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '1rem'
        }}
      />
      {error && (
        <div style={{ color: 'red', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;