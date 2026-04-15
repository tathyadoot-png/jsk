// app/layout.tsx

import './globals.css';
import NavbarWrapper from '@/components/layout/NavbarWrapper';

export const metadata = {
  title: "JSK",
  description: "Janta Suvidha Kendra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className="bg-gray-50 min-h-screen">
        <NavbarWrapper />
        <main className="max-w-7xl mx-auto px-4 py-24">
          {children}
        </main>
      </body>
    </html>
  );
}
