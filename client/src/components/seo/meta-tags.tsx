import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

export default function MetaTags({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical
}: MetaTagsProps) {
  const { t, i18n } = useTranslation();

  const defaultTitle = t('siteTitle');
  const defaultDescription = t('mainSubtitle');
  const defaultKeywords = i18n.language === 'ko' 
    ? '경쟁력 테스트, 자기 평가, 성공 측정, 개인 발전, 경력 평가'
    : i18n.language === 'ja'
    ? '競争力テスト, 自己評価, 成功測定, 個人発展, キャリア評価'
    : i18n.language === 'zh'
    ? '竞争力测试, 自我评估, 成功测量, 个人发展, 职业评估'
    : 'competitiveness test, self assessment, success measurement, personal development, career evaluation';

  useEffect(() => {
    // Update document title
    document.title = title || defaultTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || defaultDescription);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || defaultKeywords);

    // Update viewport
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      document.head.appendChild(metaViewport);
    }
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');

    // Update language
    document.documentElement.lang = i18n.language;

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: ogTitle || title || defaultTitle },
      { property: 'og:description', content: ogDescription || description || defaultDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: ogUrl || window.location.href },
      { property: 'og:image', content: ogImage || '/images/mainimage.jpg' },
      { property: 'og:site_name', content: defaultTitle },
      { property: 'og:locale', content: i18n.language === 'ko' ? 'ko_KR' : i18n.language === 'ja' ? 'ja_JP' : i18n.language === 'zh' ? 'zh_CN' : 'en_US' }
    ];

    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title || defaultTitle },
      { name: 'twitter:description', content: ogDescription || description || defaultDescription },
      { name: 'twitter:image', content: ogImage || '/images/mainimage.jpg' }
    ];

    twitterTags.forEach(({ name, content }) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    // Update canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

    // Add robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, defaultTitle, defaultDescription, defaultKeywords, i18n.language]);

  return null;
}
