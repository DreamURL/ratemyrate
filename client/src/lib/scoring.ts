export interface AssessmentData {
  age: string;
  education: string;
  occupation: string;
  wealth: string;
  marital: string;
  housing: string;
  vehicle: string;
  hobbies: string;
  social: string;
  certifications: string;
}

export interface ScoreResult {
  grade: 'S' | 'A' | 'B' | 'C';
  totalScore: number;
  breakdown: Record<string, { score: number; weighted: number }>;
}

const weights = {
  age: 0.10,
  education: 0.20,
  occupation: 0.20,
  wealth: 0.20,
  marital: 0.10,
  housing: 0.15,
  vehicle: 0.05,
  hobbies: 0.05,
  social: 0.05,
  certifications: 0.05
};

const scoring = {
  age: { '20-25': 100, '26-30': 100, '31-35': 80, '36-40': 80, '41+': 60 },
  education: { 'phd': 100, 'master': 100, 'bachelor': 80, 'associate': 60, 'high-school': 60 },
  occupation: { 'professional': 100, 'corporate': 80, 'small-business': 60, 'freelancer': 60, 'unemployed': 40 },
  wealth: { '1m+': 100, '500k-1m': 80, '100k-500k': 60, '<100k': 40 },
  marital: { 'married': 100, 'relationship': 100, 'single': 80 },
  housing: { 'urban-own': 100, 'suburban-own': 80, 'rent': 60, 'no-housing': 40 },
  vehicle: { 'luxury': 100, 'mid-range': 80, 'economy': 60, 'no-car': 60 },
  hobbies: { 'sports': 100, 'travel': 100, 'reading': 80, 'music': 90, 'cooking': 85, 'photography': 85, 'outdoor': 95, 'creative': 90, 'social': 85, 'gaming': 70, 'none': 60 },
  social: { 'extensive': 100, 'moderate': 80, 'small': 60, 'none': 60 },
  certifications: { 'professional': 100, 'technical': 100, 'language': 80, 'none': 60 }
};

export function calculateScore(data: AssessmentData): ScoreResult {
  let totalScore = 0;
  const breakdown: Record<string, { score: number; weighted: number }> = {};

  Object.keys(weights).forEach(metric => {
    const value = data[metric as keyof AssessmentData];
    const score = scoring[metric as keyof typeof scoring][value as keyof typeof scoring[keyof typeof scoring]] || 0;
    const weightedScore = score * weights[metric as keyof typeof weights];
    totalScore += weightedScore;
    breakdown[metric] = { score, weighted: weightedScore };
  });

  let grade: 'S' | 'A' | 'B' | 'C';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else grade = 'C';

  return { grade, totalScore: Math.round(totalScore), breakdown };
}

export function getLetterGrade(score: number): 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'A';
  else if (score >= 70) return 'B';
  else if (score >= 50) return 'C';
  else return 'D';
}
