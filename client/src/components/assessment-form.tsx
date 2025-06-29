import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { calculateScore, AssessmentData, ScoreResult } from "@/lib/scoring";
import { motion } from "framer-motion";

interface AssessmentFormProps {
  onSubmit: (result: ScoreResult) => void;
}

const fields = [
  'age', 'education', 'occupation', 'wealth', 'marital', 
  'housing', 'vehicle', 'hobbies', 'social', 'certifications'
];

export default function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<AssessmentData>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const isComplete = fields.every(field => formData[field as keyof AssessmentData]);
    if (!isComplete) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = calculateScore(formData as AssessmentData);
    setIsCalculating(false);
    onSubmit(result);
  };

  const isFormComplete = fields.every(field => formData[field as keyof AssessmentData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {t('formTitle')}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <Label className="block text-sm font-semibold text-slate-700">
                  {t(`fields.${field}.label`)}
                </Label>
                <Select 
                  value={formData[field as keyof AssessmentData] || ''} 
                  onValueChange={(value) => handleFieldChange(field, value)}
                >
                  <SelectTrigger className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <SelectValue placeholder={(t(`fields.${field}.options`, { returnObjects: true }) as Record<string, string>)[''] || `Select ${t(`fields.${field}.label`)}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t(`fields.${field}.options`, { returnObjects: true }) as Record<string, string>)
                      .filter(([value]) => value !== '') // Filter out empty string values
                      .map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                  {t(`fields.${field}.tooltip`)}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: fields.length * 0.1 }}
            >
              <Button 
                type="submit" 
                disabled={!isFormComplete || isCalculating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  t('calculateBtn')
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
