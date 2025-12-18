import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const { token, login, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between mb-6">
      <Link href="/">
        <Image
          src="https://www.jota.info/images/meta/jotalogo.svg"
          alt="Jota"
          width={107}
          height={40}
        />
        <span className="sr-only">Jota</span>
      </Link>

      {token ? (
        <>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="block bg-emerald-500 text-white text-sm px-4 py-1 font-medium hover:opacity-80"
            >
              Favoritos
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1 text-white text-sm font-medium hover:opacity-80"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={login}
          className="bg-gray-500 text-white text-sm px-4 py-1 font-medium hover:opacity-80"
        >
          Simular login
        </button>
      )}
    </header>
  );
}
