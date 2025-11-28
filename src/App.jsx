import React, { useState } from 'react';
import Layout from './components/Layout';
import ControlPanel from './components/ControlPanel';
import JsonViewer from './components/JsonViewer';
import ApiPreview from './components/ApiPreview';
import Toast from './components/Toast';
import { generateData } from './data-engine';

function App() {
  const [config, setConfig] = useState({
    type: 'users',
    count: 10,
    relational: false,
    customTemplate: '{\n  "name": "Example Item",\n  "status": "active"\n}'
  });
  const [data, setData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const handleGenerate = () => {
    const count = parseInt(config.count);
    if (isNaN(count) || count < 1 || count > 500) {
      setToast({ message: 'Please enter a count between 1 and 500.', type: 'error' });
      return;
    }

    if (config.type === 'custom') {
      try {
        JSON.parse(config.customTemplate);
      } catch (e) {
        setToast({ message: 'Invalid JSON template. Please check your syntax.', type: 'error' });
        return;
      }
    }

    setIsGenerating(true);
    // Simulate a small delay for "vibe"
    setTimeout(() => {
      try {
        const generatedData = generateData(config.type, count, config.relational, config.customTemplate);
        setData(generatedData);
        setToast({ message: 'Data generated successfully!', type: 'success' });
      } catch (error) {
        setToast({ message: 'An error occurred during generation.', type: 'error' });
      } finally {
        setIsGenerating(false);
      }
    }, 600);
  };

  const handleReset = () => {
    setData(null);
    setToast({ message: 'Cleared generated data.', type: 'success' });
  };

  return (
    <Layout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ControlPanel
        config={config}
        setConfig={setConfig}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {data && (
        <>
          <ApiPreview type={config.type} />
          <JsonViewer data={data} onReset={handleReset} />
        </>
      )}
    </Layout>
  );
}

export default App;
