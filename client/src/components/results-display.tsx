import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScoreResult, getLetterGrade } from "@/lib/scoring";
import RadarChart from "@/components/radar-chart";
import NormalDistributionChart from "./normal-distribution-chart";
import { motion } from "framer-motion";

interface ResultsDisplayProps {
  results: ScoreResult;
  onRetry: () => void;
}

export default function ResultsDisplay({ results, onRetry }: ResultsDisplayProps) {
  const { t, i18n } = useTranslation();
  const { grade, totalScore, percentile, breakdown } = results;
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

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

  const getMetricExplanation = (metric: string, score: number) => {
    const explanations = {
      education: {
        high: t('explanations.education.high', 'Higher education opens doors to better career opportunities and higher earning potential.'),
        medium: t('explanations.education.medium', 'Your education level provides a good foundation for career growth.'),
        low: t('explanations.education.low', 'Consider pursuing additional education or certifications to enhance your competitiveness.')
      },
      occupation: {
        high: t('explanations.occupation.high', 'Professional careers typically offer stability, prestige, and growth opportunities.'),
        medium: t('explanations.occupation.medium', 'Your occupation provides decent stability and growth potential.'),
        low: t('explanations.occupation.low', 'Consider developing skills for higher-status career opportunities.')
      },
      wealth: {
        high: t('explanations.wealth.high', 'Self-earned wealth demonstrates financial independence and success.'),
        medium: t('explanations.wealth.medium', 'You have built a solid financial foundation through your efforts.'),
        low: t('explanations.wealth.low', 'Focus on increasing your earning potential and building wealth over time.')
      },
      marital: {
        high: t('explanations.marital.high', 'Stable relationships often correlate with personal fulfillment and social support.'),
        medium: t('explanations.marital.medium', 'Your relationship status reflects your current life priorities.'),
        low: t('explanations.marital.low', 'Relationship status is personal and may change based on your goals.')
      },
      housing: {
        high: t('explanations.housing.high', 'Property ownership, especially in urban areas, indicates financial stability.'),
        medium: t('explanations.housing.medium', 'You have secured stable housing, which is an important foundation.'),
        low: t('explanations.housing.low', 'Work towards homeownership when financially feasible for long-term stability.')
      },
      vehicle: {
        high: t('explanations.vehicle.high', 'Vehicle ownership can reflect financial status and lifestyle choices.'),
        medium: t('explanations.vehicle.medium', 'You have practical transportation that meets your needs.'),
        low: t('explanations.vehicle.low', 'Transportation needs vary by location and personal circumstances.')
      },
      hobbies: {
        high: t('explanations.hobbies.high', 'Active hobbies demonstrate work-life balance and personal development.'),
        medium: t('explanations.hobbies.medium', 'Your hobbies contribute to a well-rounded lifestyle.'),
        low: t('explanations.hobbies.low', 'Consider developing hobbies that promote physical and mental well-being.')
      },
      social: {
        high: t('explanations.social.high', 'Strong social networks enhance career opportunities and personal support.'),
        medium: t('explanations.social.medium', 'You maintain meaningful social connections.'),
        low: t('explanations.social.low', 'Building professional and personal networks can open new opportunities.')
      },
      certifications: {
        high: t('explanations.certifications.high', 'Professional certifications demonstrate expertise and commitment to growth.'),
        medium: t('explanations.certifications.medium', 'Your skills provide a competitive advantage in your field.'),
        low: t('explanations.certifications.low', 'Consider acquiring certifications relevant to your career goals.')
      }
    };

    const level = score >= 90 ? 'high' : score >= 70 ? 'medium' : 'low';
    return explanations[metric as keyof typeof explanations]?.[level] || 'No explanation available.';
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

      {/* Percentile Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold text-slate-900 mb-6 text-center">
              상위 {100 - percentile}% 입니다
            </h4>
            <div className="text-center mb-6">
              <p className="text-slate-600">
                당신은 전체 사용자 중 상위 <span className="font-bold text-blue-600">{100 - percentile}%</span>에 해당합니다
              </p>
            </div>
            <NormalDistributionChart userScore={totalScore} percentile={percentile} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold text-slate-900 mb-6">
              {t('detailedBreakdown')}
            </h4>
            <p className="text-sm text-slate-500 mb-4">각 항목을 클릭하면 상세한 설명을 볼 수 있습니다</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(breakdown).map((metric, index) => {
                const { score } = breakdown[metric];
                const letterGrade = getLetterGrade(score);
                const gradeColorClass = `text-grade-${letterGrade.toLowerCase()}`;

                return (
                  <Dialog key={metric}>
                    <DialogTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-700">
                          {t(`metricNames.${metric}`)}
                        </span>
                        <span className={`font-bold text-lg ${gradeColorClass}`}>
                          {letterGrade}
                        </span>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{t(`metricNames.${metric}`)} - {letterGrade}등급</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-slate-700 leading-relaxed">
                          {getMetricExplanation(metric, score)}
                        </p>
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">
                            <strong>점수:</strong> {score}/100점
                          </p>
                          <p className="text-sm text-slate-600">
                            <strong>등급:</strong> {letterGrade}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
