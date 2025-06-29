// SEO 메타데이터 관리 유틸리티

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

const metaDataByLanguage: Record<string, MetaData> = {
  ko: {
    title: "내 경쟁력 등급 테스트 - 글로벌 자기평가",
    description: "부모 찬스 없이 순수한 자신의 성취를 평가해보세요! 10가지 핵심 지표로 나의 글로벌 경쟁력 순위를 확인하는 다국어 자기평가 테스트입니다.",
    keywords: "경쟁력 테스트, 자기평가, 성공 측정, 개인 발전, 커리어 평가, 순위 테스트",
    ogTitle: "내 경쟁력 등급 테스트 - 글로벌 자기평가",
    ogDescription: "부모 찬스 없이 순수한 자신의 성취를 평가해보세요! 10가지 핵심 지표로 나의 글로벌 경쟁력 순위를 확인하는 다국어 자기평가 테스트입니다.",
    twitterTitle: "내 경쟁력 등급 테스트 - 글로벌 자기평가",
    twitterDescription: "부모 찬스 없이 순수한 자신의 성취를 평가해보세요! 10가지 핵심 지표로 나의 글로벌 경쟁력 순위를 확인하는 다국어 자기평가 테스트입니다."
  },
  en: {
    title: "My Competitiveness Rank Test - Global Self-Assessment",
    description: "Evaluate your achievements without parental influence! Take our multilingual competitive self-assessment test and discover your global ranking across 10 key metrics.",
    keywords: "competitiveness test, self assessment, success measurement, personal development, career evaluation, ranking test",
    ogTitle: "My Competitiveness Rank Test - Global Self-Assessment",
    ogDescription: "Evaluate your achievements without parental influence! Take our multilingual competitive self-assessment test and discover your global ranking across 10 key metrics.",
    twitterTitle: "My Competitiveness Rank Test - Global Self-Assessment",
    twitterDescription: "Evaluate your achievements without parental influence! Take our multilingual competitive self-assessment test and discover your global ranking across 10 key metrics."
  },
  ja: {
    title: "私の競争力ランクテスト - グローバル自己評価",
    description: "親の力に頼らない純粋な自分の成果を評価してみましょう！10の重要指標で自分のグローバル競争力順位を確認する多言語自己評価テストです。",
    keywords: "競争力テスト, 自己評価, 成功測定, 個人発展, キャリア評価, ランキングテスト",
    ogTitle: "私の競争力ランクテスト - グローバル自己評価",
    ogDescription: "親の力に頼らない純粋な自分の成果を評価してみましょう！10の重要指標で自分のグローバル競争力順位を確認する多言語自己評価テストです。",
    twitterTitle: "私の競争力ランクテスト - グローバル自己評価",
    twitterDescription: "親の力に頼らない純粋な自分の成果を評価してみましょう！10の重要指標で自分のグローバル競争力順位を確認する多言語自己評価テストです。"
  },
  zh: {
    title: "我的竞争力等级测试 - 全球自我评估",
    description: "评估您不依赖父母帮助的纯粹个人成就！通过10个关键指标发现您的全球竞争力排名的多语言自我评估测试。",
    keywords: "竞争力测试, 自我评估, 成功测量, 个人发展, 职业评估, 排名测试",
    ogTitle: "我的竞争力等级测试 - 全球自我评估",
    ogDescription: "评估您不依赖父母帮助的纯粹个人成就！通过10个关键指标发现您的全球竞争力排名的多语言自我评估测试。",
    twitterTitle: "我的竞争力等级测试 - 全球自我评估",
    twitterDescription: "评估您不依赖父母帮助的纯粹个人成就！通过10个关键指标发现您的全球竞争力排名的多语言自我评估测试。"
  }
};

export function updateMetaData(language: string) {
  const metadata = metaDataByLanguage[language] || metaDataByLanguage.en;
  
  // 페이지 제목 업데이트
  document.title = metadata.title;
  
  // HTML lang 속성 업데이트
  document.documentElement.lang = language;
  
  // 메타 태그들 업데이트
  updateMetaTag('name', 'description', metadata.description);
  updateMetaTag('name', 'keywords', metadata.keywords);
  
  // Open Graph 태그들 업데이트
  updateMetaTag('property', 'og:title', metadata.ogTitle);
  updateMetaTag('property', 'og:description', metadata.ogDescription);
  updateMetaTag('property', 'og:locale', getOGLocale(language));
  
  // Twitter 태그들 업데이트
  updateMetaTag('name', 'twitter:title', metadata.twitterTitle);
  updateMetaTag('name', 'twitter:description', metadata.twitterDescription);
}

function updateMetaTag(attribute: string, name: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (element) {
    element.content = content;
  } else {
    // 메타 태그가 없으면 새로 생성
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.content = content;
    document.head.appendChild(element);
  }
}

function getOGLocale(language: string): string {
  const localeMap: Record<string, string> = {
    ko: 'ko_KR',
    en: 'en_US',
    ja: 'ja_JP',
    zh: 'zh_CN'
  };
  return localeMap[language] || 'en_US';
}

export { metaDataByLanguage };
