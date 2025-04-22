import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useTranslation = () => {
  const { locale } = useRouter();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${locale}/common.json`);
      const data = await response.json();
      setTranslations(data);
    };
    loadTranslations();
  }, [locale]);

  return translations;
};