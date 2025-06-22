export interface HealthFormData {
  age: number;
  sex: 'male' | 'female' | '';
  chestPainType: 'typical_angina' | 'atypical_angina' | 'non_anginal_pain' | 'asymptomatic' | '';
  restingBP: number;
  cholesterol: number;
  fastingBS: boolean;
  restingECG: 'normal' | 'st_t_abnormal' | 'lv_hypertrophy' | '';
  maxHeartRate: number;
  exerciseAngina: boolean;
  stDepression: number;
  slope: 'upsloping' | 'flat' | 'downsloping' | '';
  majorVessels: number;
  thalassemia: 'normal' | 'fixed_defect' | 'reversible_defect' | '';
}

export interface PredictionResult {
  risk: 'low' | 'high';
  confidence: number;
  message: string;
  riskPercentage?: number;
}