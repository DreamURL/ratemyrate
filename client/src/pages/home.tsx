import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/language-selector";
import AssessmentForm from "@/components/assessment-form";
import ResultsDisplay from "@/components/results-display";
import { ScoreResult } from "@/lib/scoring";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [results, setResults] = useState<ScoreResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Update body font class based on language
  useEffect(() => {
    const cjkLanguages = ['ko', 'ja', 'zh'];
    const body = document.body;
    
    if (cjkLanguages.includes(i18n.language)) {
      body.className = body.className.replace(/font-\w+/, 'font-noto-cjk');
    } else {
      body.className = body.className.replace(/font-\w+/, 'font-noto');
    }
  }, [i18n.language]);

  const handleFormSubmit = (result: ScoreResult) => {
    setResults(result);
    setShowResults(true);
    // Scroll to results section after a brief delay
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRetry = () => {
    setResults(null);
    setShowResults(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🏆</span>
                </div>
                <h1 className="ml-2 text-xl font-semibold text-slate-900">
                  {t('siteTitle')}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              <nav className="hidden md:flex space-x-4">
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
                  {t('terms')}
                </a>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
                  {t('privacy')}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
            alt="Diverse team collaboration" 
            className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8" 
          />
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('mainTitle')}
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('mainSubtitle')}
          </p>
        </div>

        {/* Assessment Form */}
        {!showResults && (
          <AssessmentForm onSubmit={handleFormSubmit} />
        )}

        {/* Results Section */}
        {showResults && results && (
          <div id="results-section">
            <ResultsDisplay results={results} onRetry={handleRetry} />
          </div>
        )}

        {/* Ad Space */}
        <div className="mt-12 text-center">
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8">
            <p className="text-slate-500 text-sm">Advertisement Space (728x90)</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <nav className="flex justify-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 text-sm">
                {t('terms')}
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 text-sm">
                {t('privacy')}
              </a>
              <a href="mailto:contact@example.com" className="text-slate-600 hover:text-blue-600 text-sm">
                {t('contact')}
              </a>
            </nav>
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
