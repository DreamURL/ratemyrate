import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function StructuredData() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": t('siteTitle'),
      "description": t('mainSubtitle'),
      "url": window.location.origin,
      "applicationCategory": "Entertainment",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "inLanguage": [
        {
          "@type": "Language",
          "name": "Korean",
          "alternateName": "ko"
        },
        {
          "@type": "Language", 
          "name": "Japanese",
          "alternateName": "ja"
        },
        {
          "@type": "Language",
          "name": "Chinese",
          "alternateName": "zh"
        },
        {
          "@type": "Language",
          "name": "English", 
          "alternateName": "en"
        }
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Competitiveness Assessment Service"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Competitiveness Assessment Service"
      },
      "datePublished": "2025-06-29",
      "dateModified": "2025-06-29",
      "genre": "Entertainment",
      "audience": {
        "@type": "Audience",
        "audienceType": "General Public"
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/UseAction",
        "userInteractionCount": 0
      }
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [t, i18n.language]);

  return null;
}
