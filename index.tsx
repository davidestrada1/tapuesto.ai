
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application mount...');
console.log('Environment Check:', {
  hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
  hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  baseUrl: import.meta.env.BASE_URL
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Application mounted successfully.');
} catch (error) {
  console.error('Failed to mount application:', error);
  document.body.innerHTML += `<div style="color: red; padding: 20px;">Failed to start app: ${error}</div>`;
}