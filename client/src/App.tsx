import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import TermsOfUse from "@/pages/terms-of-use";
import PrivacyPolicy from "@/pages/privacy-policy";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";
import { useEffect } from "react";
import { updateMetaData } from "./utils/seo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms-of-use" component={TermsOfUse} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // 초기 메타데이터 설정
    updateMetaData(i18n.language);
    
    // 언어 변경 감지 및 메타데이터 업데이트
    const handleLanguageChange = (lng: string) => {
      updateMetaData(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
