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
  percentile: number;
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
  age: { 
    '20-29': 100, '30-39': 90, '40-49': 80, '50-59': 70, '60-69': 60, '70-79': 50,
    // Legacy support
    '20-25': 100, '26-30': 100, '31-35': 80, '36-40': 80, '41+': 60 
  },
  education: { 'phd': 100, 'master': 100, 'bachelor': 80, 'associate': 60, 'high-school': 60 },
  occupation: { 
    'doctor': 100, 'lawyer': 100, 'engineer': 95, 'professor': 100, 'finance': 95, 'tech': 90, 'consultant': 90,
    'manager': 85, 'corporate': 80, 'civil-servant': 75, 'teacher': 70, 'startup': 75, 'small-business': 60, 
    'freelancer': 60, 'artist': 55, 'service': 50, 'unemployed': 40,
    // Legacy support
    'professional': 95
  },
  wealth: { 
    '5b+': 100, '2b-5b': 95, '1b-2b': 90, '700m-1b': 85, '500m-700m': 80, 
    '300m-500m': 75, '200m-300m': 70, '100m-200m': 60, '50m-100m': 50, '<50m': 40,
    // Legacy support
    '1m+': 90, '500k-1m': 75, '100k-500k': 60, '<100k': 40 
  },
  marital: { 'married': 100, 'relationship': 100, 'single': 80 },
  housing: { 
    'seoul-apt': 100, 'metro-apt': 90, 'seoul-villa': 85, 'metro-villa': 80, 'provincial-own': 70,
    'seoul-jeonse': 75, 'metro-jeonse': 70, 'seoul-rent': 60, 'metro-rent': 55, 'provincial-rent': 50,
    'family-home': 45, 'goshiwon': 35, 'no-housing': 30,
    // Legacy support
    'urban-own': 90, 'suburban-own': 70, 'rent': 55
  },
  vehicle: { 
    'luxury-foreign': 100, 'luxury-domestic': 95, 'foreign-mid': 85, 'domestic-mid': 80, 'suv': 75,
    'compact': 65, 'economy': 55, 'electric': 90, 'motorcycle': 50, 'no-car': 45,
    // Legacy support
    'luxury': 95, 'mid-range': 75
  },
  hobbies: { 'sports': 100, 'travel': 100, 'reading': 80, 'music': 90, 'cooking': 85, 'photography': 85, 'outdoor': 95, 'creative': 90, 'social': 85, 'gaming': 70, 'none': 60 },
  social: { 
    'business-leader': 100, 'professional': 95, 'corporate': 90, 'industry': 85, 'alumni': 90, 'startup': 80,
    'creative': 75, 'moderate': 70, 'local': 65, 'online': 60, 'small': 55, 'none': 40,
    // Legacy support
    'extensive': 90
  },
  certifications: { 
    'professional-license': 100, 'financial': 95, 'tech-advanced': 90, 'tech-basic': 75, 'language-advanced': 85,
    'language-intermediate': 75, 'project-management': 80, 'design': 70, 'trade': 70, 'education': 65,
    'language-basic': 60, 'none': 40,
    // Legacy support
    'professional': 90, 'technical': 80, 'language': 70
  }
};

export function calculateScore(data: AssessmentData): ScoreResult {
  let totalScore = 0;
  const breakdown: Record<string, { score: number; weighted: number }> = {};

  Object.keys(weights).forEach(metric => {
    if (metric === 'age') return; // Skip age in final breakdown
    const value = data[metric as keyof AssessmentData];
    const score = scoring[metric as keyof typeof scoring][value as keyof typeof scoring[keyof typeof scoring]] || 0;
    const weightedScore = score * weights[metric as keyof typeof weights];
    totalScore += weightedScore;
    breakdown[metric] = { score, weighted: weightedScore };
  });

  // Calculate percentile based on normal distribution (mean=75, std=15)
  const percentile = Math.round(calculatePercentile(totalScore));

  let grade: 'S' | 'A' | 'B' | 'C';
  if (totalScore >= 90) grade = 'S';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else grade = 'C';

  return { grade, totalScore: Math.round(totalScore), percentile, breakdown };
}

function calculatePercentile(score: number): number {
  // Using normal distribution with mean=75, std=15
  const mean = 75;
  const std = 15;
  const z = (score - mean) / std;
  
  // Approximation of cumulative normal distribution
  const erfApprox = (x: number) => {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
  };
  
  const percentile = 50 * (1 + erfApprox(z / Math.sqrt(2)));
  return Math.max(1, Math.min(99, percentile));
}

export function getLetterGrade(score: number): 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'A';
  else if (score >= 70) return 'B';
  else if (score >= 50) return 'C';
  else return 'D';
}
