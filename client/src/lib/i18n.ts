import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import en from '../translations/en.json';
import ko from '../translations/ko.json';
import ja from '../translations/ja.json';
import zh from '../translations/zh.json';
import es from '../translations/es.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  ja: { translation: ja },
  zh: { translation: zh },
  es: { translation: es }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
