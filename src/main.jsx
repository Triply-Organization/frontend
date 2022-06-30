import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import 'aos/dist/aos.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.scss';

ConfigProvider.config({
  theme: {
    primaryColor: '#dc834e',
  },
});

ConfigProvider.config({
  theme: {
    primaryColor: '#dc834e',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
