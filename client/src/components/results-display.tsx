import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScoreResult, getLetterGrade } from "@/lib/scoring";
import RadarChart from "@/components/radar-chart";
import { motion } from "framer-motion";

interface ResultsDisplayProps {
  results: ScoreResult;
  onRetry: () => void;
}

export default function ResultsDisplay({ results, onRetry }: ResultsDisplayProps) {
  const { t, i18n } = useTranslation();
  const { grade, totalScore, breakdown } = results;

  const gradeColors = {
    'S': 'grade-s',
    'A': 'grade-a',
    'B': 'grade-b',
    'C': 'grade-c'
  };

  const handleShare = () => {
    const shareText = t('shareText', { 
      grade, 
      url: window.location.href 
    });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Overall Grade */}
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold text-white mb-4 ${gradeColors[grade]}`}
          >
            {grade}
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            {t(`gradeTitle.${grade}`)}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-slate-600 mb-6"
          >
            {t(`gradeDescription.${grade}`)}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-sm text-slate-500"
          >
            {t('totalScore')}: <span className="font-semibold">{totalScore}/100</span>
          </motion.div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold text-slate-900 mb-6 text-center">
              {t('yourProfile')}
            </h4>
            <div className="max-w-md mx-auto">
              <RadarChart breakdown={breakdown} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Individual Grades */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold text-slate-900 mb-6">
              {t('detailedBreakdown')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(breakdown).map((metric, index) => {
                const { score } = breakdown[metric];
                const letterGrade = getLetterGrade(score);
                const gradeColorClass = `text-grade-${letterGrade.toLowerCase()}`;

                return (
                  <motion.div
                    key={metric}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex justify-between items-center p-4 bg-slate-50 rounded-lg"
                  >
                    <span className="font-medium text-slate-700">
                      {t(`metricNames.${metric}`)}
                    </span>
                    <span className={`font-bold text-lg ${gradeColorClass}`}>
                      {letterGrade}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button 
          onClick={handleShare}
          className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>{t('shareBtn')}</span>
          <span>🐦</span>
        </Button>
        <Button 
          onClick={onRetry}
          variant="secondary"
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          {t('retryBtn')}
        </Button>
      </motion.div>
    </motion.div>
  );
}
