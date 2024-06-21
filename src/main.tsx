import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import 'antd/dist/reset.css';
import queryClient from './queryClient';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider } from './context/cartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </CartProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);