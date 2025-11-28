import React, { useState } from 'react';
import Layout from './components/Layout';
import ControlPanel from './components/ControlPanel';
import JsonViewer from './components/JsonViewer';
import ApiPreview from './components/ApiPreview';
import ValidationPanel from './components/ValidationPanel';
import Toast from './components/Toast';
import { generateData } from './data-engine';

function App() {
  const [config, setConfig] = useState({
    type: 'users',
    count: 10,
    relational: false,
    relationMode: 'single', // 'single' | 'nested' | 'multi'
    customTemplate: '{}'
  });
  const [data, setData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleGenerate = () => {
    // Validate count
    if (config.count < 1 || config.count > 500) {
      setToast({ message: 'Please enter a count between 1 and 500.', type: 'error' });
      return;
    }

    // Validate custom JSON if type is custom
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
        const generatedData = generateData(config.type, config.count, config.relational, config.customTemplate, config.relationMode);
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
          <JsonViewer data={data} onReset={handleReset} setToast={setToast} />
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowValidation(!showValidation)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {showValidation ? 'Hide Validation' : 'Show Data Validation'}
            </button>
          </div>
          {showValidation && (
            <ValidationPanel 
              data={data} 
              dataType={config.type} 
              onClose={() => setShowValidation(false)} 
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default App;
