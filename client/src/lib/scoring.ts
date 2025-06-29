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
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
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
  education: { 'phd': 100, 'master': 90, 'bachelor': 75, 'associate': 60, 'high-school': 45 },
  occupation: { 
    'doctor': 100, 'lawyer': 100, 'engineer': 90, 'professor': 100, 'finance': 90, 'tech': 80, 'consultant': 80,
    'manager': 75, 'corporate': 70, 'civil-servant': 65, 'teacher': 60, 'startup': 60, 'small-business': 50, 
    'freelancer': 50, 'artist': 40, 'service': 35, 'unemployed': 30,
    // Legacy support
    'professional': 90
  },
  wealth: { 
    '5b+': 100, '2b-5b': 95, '1b-2b': 90, '700m-1b': 85, '500m-700m': 80, 
    '300m-500m': 75, '200m-300m': 70, '100m-200m': 60, '50m-100m': 50, '<50m': 40,
    // Legacy support
    '1m+': 90, '500k-1m': 75, '100k-500k': 60, '<100k': 40 
  },
  marital: { 'married': 100, 'relationship': 80, 'single': 60 },
  housing: { 
    'seoul-apt': 100, 'metro-apt': 90, 'seoul-villa': 85, 'metro-villa': 80, 'provincial-own': 70,
    'seoul-jeonse': 65, 'metro-jeonse': 60, 'seoul-rent': 55, 'metro-rent': 50, 'provincial-rent': 45,
    'family-home': 40, 'goshiwon': 35, 'no-housing': 30,
    // Legacy support
    'urban-own': 90, 'suburban-own': 70, 'rent': 55
  },
  vehicle: { 
    'luxury-foreign': 100, 'luxury-domestic': 90, 'foreign-mid': 80, 'domestic-mid': 70, 'suv': 65,
    'compact': 55, 'economy': 45, 'electric': 80, 'motorcycle': 40, 'no-car': 30,
    // Legacy support
    'luxury': 90, 'mid-range': 70
  },
  hobbies: { 'sports': 100, 'travel': 90, 'reading': 80, 'music': 75, 'cooking': 70, 'photography': 70, 'outdoor': 80, 'creative': 75, 'social': 70, 'gaming': 60, 'none': 40 },
  social: { 
    'business-leader': 100, 'professional': 90, 'corporate': 80, 'industry': 75, 'alumni': 75, 'startup': 70,
    'creative': 65, 'moderate': 60, 'local': 55, 'online': 50, 'small': 45, 'none': 30,
    // Legacy support
    'extensive': 80
  },
  certifications: { 
    'professional-license': 100, 'financial': 90, 'tech-advanced': 80, 'tech-basic': 65, 'language-advanced': 75,
    'language-intermediate': 65, 'project-management': 70, 'design': 60, 'trade': 60, 'education': 55,
    'language-basic': 50, 'none': 30,
    // Legacy support
    'professional': 80, 'technical': 70, 'language': 60
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

  // Calculate percentile based on normal distribution (mean=50, std=20)
  const percentile = Math.round(calculatePercentile(totalScore));

  let grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  if (totalScore >= 95) grade = 'S';
  else if (totalScore >= 85) grade = 'A';
  else if (totalScore >= 75) grade = 'B';
  else if (totalScore >= 65) grade = 'C';
  else if (totalScore >= 55) grade = 'D';
  else if (totalScore >= 45) grade = 'E';
  else grade = 'F';

  return { grade, totalScore: Math.round(totalScore), percentile, breakdown };
}

function calculatePercentile(score: number): number {
  // Using normal distribution with mean=50, std=20 (그래프와 일치)
  const mean = 50;
  const std = 20;
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

export function getLetterGrade(score: number): 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' {
  if (score >= 95) return 'S';
  else if (score >= 85) return 'A';
  else if (score >= 75) return 'B';
  else if (score >= 65) return 'C';
  else if (score >= 55) return 'D';
  else if (score >= 45) return 'E';
  else return 'F';
}
