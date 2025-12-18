import { ReactNode } from 'react';

export default function MockLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <a href={href}>{children}</a>;
}
