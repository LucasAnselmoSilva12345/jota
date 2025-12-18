import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';

export function Header() {
  const { token, login, logout } = useAuthStore();
  return (
    <header>
      <Link href="/">Home</Link>

      {token ? (
        <>
          <Link href="/admin">Favoritos</Link>
          <button onClick={logout}></button>
        </>
      ) : (
        <button onClick={login}>Simular login</button>
      )}
    </header>
  );
}
