import './globals.css';
import { I18nProvider } from '@/lib/i18nClient'
export const metadata = {
  title: 'القانون المغربي - Assistant juridique IA',
  description: 'Assistant juridique intelligent basé sur l\'IA pour le droit marocain',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}