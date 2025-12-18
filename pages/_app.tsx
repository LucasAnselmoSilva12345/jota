import { useAuthStore } from '@/store/auth.store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const setToken = useAuthStore((s) => s.login);
  const setFavorites = useAuthStore((s) => s.toggleFavorites);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (token) {
      useAuthStore.setState({ token });
    }

    useAuthStore.setState({ favorites });
  }, []);

  return <Component {...pageProps} />;
}
