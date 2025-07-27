import React, { useEffect } from 'react';
import FormBuilder from './components/FormBuilder';
import { useFormStore } from './store/formStore';

const App = () => {
  const { schema, loading, fetchSchema } = useFormStore();

  useEffect(() => {
    fetchSchema(); // Load once on mount
  }, [fetchSchema]);

  return (
    <div className="app">
      <h1>Dynamic Form Builder</h1>
      {loading ? (
        <p>Loading schema...</p>
      ) : schema ? (
        <FormBuilder schema={schema} />
      ) : (
        <p>Failed to load schema</p>
      )}
    </div>
  );
};

export default App;
