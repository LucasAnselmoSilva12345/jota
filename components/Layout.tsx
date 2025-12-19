import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 lg:max-w-325 lg:mx-auto lg:my-0">
      <Header />
      {children}
    </div>
  );
}
