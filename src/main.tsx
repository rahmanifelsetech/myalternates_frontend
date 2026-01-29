import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
// import ErrorBoundary from '@shared/components/common/ErrorBoundary';
import { applyTheme } from '@shared/utils/themeUtils';
import './index.css';
import 'swiper/swiper-bundle.css';
import 'flatpickr/dist/flatpickr.css';

// Apply theme configuration
applyTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
