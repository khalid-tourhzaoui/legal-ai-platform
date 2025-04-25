import './globals.css';
export const metadata = {
  title: 'القانون المغربي - Assistant juridique IA',
  description: 'Assistant juridique intelligent basé sur l\'IA pour le droit marocain',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}