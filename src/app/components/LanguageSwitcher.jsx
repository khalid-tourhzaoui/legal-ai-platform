import { useRouter } from 'next/router';
import Link from 'next/link';

const LanguageSwitcher = () => {
  const { locale, asPath } = useRouter();

  return (
    <div className="flex gap-2">
      <Link href={asPath} locale="fr">
        <a className={locale === 'fr' ? 'font-bold' : ''}>FR</a>
      </Link>
      <Link href={asPath} locale="ar">
        <a className={locale === 'ar' ? 'font-bold' : ''}>AR</a>
      </Link>
      <Link href={asPath} locale="en">
        <a className={locale === 'en' ? 'font-bold' : ''}>EN</a>
      </Link>
    </div>
  );
};

export default LanguageSwitcher;