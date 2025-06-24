import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Activity, 
  Droplets, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Target,
  AlertCircle,
  Stethoscope,
  AlertTriangle
} from 'lucide-react';
import FormField from './FormField';
import { HealthFormData } from '../types/health';

interface HealthFormProps {
  formData: HealthFormData;
  onChange: (data: HealthFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error?: string | null;
}

const HealthForm: React.FC<HealthFormProps> = ({ formData, onChange, onSubmit, isLoading, error }) => {
  const [errors, setErrors] = useState<Partial<HealthFormData>>({});

  const handleInputChange = (field: keyof HealthFormData, value: any) => {
    onChange({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<HealthFormData> = {};
    
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = formData.age;
    }
    if (!formData.sex) newErrors.sex = formData.sex;
    if (!formData.chestPainType) newErrors.chestPainType = formData.chestPainType;
    if (!formData.restingBP || formData.restingBP < 50 || formData.restingBP > 300) {
      newErrors.restingBP = formData.restingBP;
    }
    if (!formData.cholesterol || formData.cholesterol < 100 || formData.cholesterol > 600) {
      newErrors.cholesterol = formData.cholesterol;
    }
    if (!formData.restingECG) newErrors.restingECG = formData.restingECG;
    if (!formData.maxHeartRate || formData.maxHeartRate < 60 || formData.maxHeartRate > 220) {
      newErrors.maxHeartRate = formData.maxHeartRate;
    }
    if (formData.stDepression < 0 || formData.stDepression > 10) {
      newErrors.stDepression = formData.stDepression;
    }
    if (!formData.slope) newErrors.slope = formData.slope;
    if (formData.majorVessels < 0 || formData.majorVessels > 3) {
      newErrors.majorVessels = formData.majorVessels;
    }
    if (!formData.thalassemia) newErrors.thalassemia = formData.thalassemia;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="glass rounded-2xl p-5 shadow-2xl">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-400/20 rounded-full mb-2">
          <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          Sağlık Değerlendirme Formu
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Doğru risk değerlendirmesi için lütfen sağlık bilgilerinizi doldurun
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-300 text-xs font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age */}
          <FormField label="Yaş" icon={User} tooltip="Yaşınız (yıl olarak)">
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.age ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
              placeholder="Yaşınızı girin"
              min="1"
              max="120"
            />
          </FormField>

          {/* Sex */}
          <FormField label="Cinsiyet" icon={User}>
            <select
              value={formData.sex}
              onChange={(e) => handleInputChange('sex', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.sex ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">Cinsiyet seçin</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </FormField>

          {/* Chest Pain Type */}
          <FormField 
            label="Göğüs Ağrısı Tipi" 
            icon={Heart} 
            tooltip="Yaşadığınız göğüs ağrısı tipi"
          >
            <select
              value={formData.chestPainType}
              onChange={(e) => handleInputChange('chestPainType', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.chestPainType ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">Göğüs ağrısı tipi seçin</option>
              <option value="typical_angina">Tipik Anjina</option>
              <option value="atypical_angina">Atipik Anjina</option>
              <option value="non_anginal_pain">Anjinal Olmayan Ağrı</option>
              <option value="asymptomatic">Asemptomatik</option>
            </select>
          </FormField>

          {/* Resting Blood Pressure */}
          <FormField 
            label="Dinlenik Kan Basıncı" 
            icon={Activity} 
            tooltip="Dinlenme halindeki kan basıncı (mmHg)"
          >
            <input
              type="number"
              value={formData.restingBP || ''}
              onChange={(e) => handleInputChange('restingBP', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.restingBP ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
              placeholder="örn. 120"
              min="50"
              max="300"
            />
          </FormField>

          {/* Cholesterol */}
          <FormField 
            label="Serum Kolesterol" 
            icon={Droplets} 
            tooltip="Kolesterol seviyesi (mg/dl)"
          >
            <input
              type="number"
              value={formData.cholesterol || ''}
              onChange={(e) => handleInputChange('cholesterol', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.cholesterol ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
              placeholder="örn. 200"
              min="100"
              max="600"
            />
          </FormField>

          {/* Fasting Blood Sugar */}
          <FormField 
            label="Açlık Kan Şekeri > 120 mg/dl" 
            icon={Target} 
            tooltip="Açlık kan şekeriniz 120 mg/dl'den yüksek mi?"
          >
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="fastingBS"
                  checked={formData.fastingBS === true}
                  onChange={() => handleInputChange('fastingBS', true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Evet</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="fastingBS"
                  checked={formData.fastingBS === false}
                  onChange={() => handleInputChange('fastingBS', false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Hayır</span>
              </label>
            </div>
          </FormField>

          {/* Resting ECG */}
          <FormField 
            label="Dinlenik EKG Sonuçları" 
            icon={Zap} 
            tooltip="Elektrokardiyografik inceleme sonuçları"
          >
            <select
              value={formData.restingECG}
              onChange={(e) => handleInputChange('restingECG', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.restingECG ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">EKG sonucu seçin</option>
              <option value="normal">Normal</option>
              <option value="st_t_abnormal">ST-T Dalgası Anormalliği</option>
              <option value="lv_hypertrophy">Sol Ventrikül Hipertrofisi</option>
            </select>
          </FormField>

          {/* Max Heart Rate */}
          <FormField 
            label="Maksimum Kalp Atış Hızı" 
            icon={Heart} 
            tooltip="Egzersiz sırasında ulaşılan maksimum kalp atış hızı"
          >
            <input
              type="number"
              value={formData.maxHeartRate || ''}
              onChange={(e) => handleInputChange('maxHeartRate', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.maxHeartRate ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
              placeholder="örn. 150"
              min="60"
              max="220"
            />
          </FormField>

          {/* Exercise Induced Angina */}
          <FormField 
            label="Egzersiz Kaynaklı Anjina" 
            icon={AlertCircle} 
            tooltip="Egzersiz sırasında göğüs ağrısı yaşıyor musunuz?"
          >
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="exerciseAngina"
                  checked={formData.exerciseAngina === true}
                  onChange={() => handleInputChange('exerciseAngina', true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Evet</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="exerciseAngina"
                  checked={formData.exerciseAngina === false}
                  onChange={() => handleInputChange('exerciseAngina', false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Hayır</span>
              </label>
            </div>
          </FormField>

          {/* ST Depression */}
          <FormField 
            label="ST Depresyonu" 
            icon={TrendingUp} 
            tooltip="Dinlenmeye göre egzersizle indüklenen ST depresyonu"
          >
            <input
              type="number"
              step="0.1"
              value={formData.stDepression || ''}
              onChange={(e) => handleInputChange('stDepression', parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.stDepression ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
              placeholder="örn. 1.0"
              min="0"
              max="10"
            />
          </FormField>

          {/* Slope */}
          <FormField 
            label="Pik Egzersiz ST Eğimi" 
            icon={BarChart3} 
            tooltip="Pik egzersiz ST segmentinin eğimi"
          >
            <select
              value={formData.slope}
              onChange={(e) => handleInputChange('slope', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.slope ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">Eğim seçin</option>
              <option value="upsloping">Yukarı Eğimli</option>
              <option value="flat">Düz</option>
              <option value="downsloping">Aşağı Eğimli</option>
            </select>
          </FormField>

          {/* Major Vessels */}
          <FormField 
            label="Renklendirilmiş Ana Damar Sayısı" 
            icon={Droplets} 
            tooltip="Floroskopi ile renklendirilen ana damar sayısı (0-3)"
          >
            <select
              value={formData.majorVessels}
              onChange={(e) => handleInputChange('majorVessels', parseInt(e.target.value))}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.majorVessels ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">Sayı seçin</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </FormField>

          {/* Thalassemia */}
          <FormField 
            label="Talasemi" 
            icon={Heart} 
            tooltip="Talasemi test sonucu"
          >
            <select
              value={formData.thalassemia}
              onChange={(e) => handleInputChange('thalassemia', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border-2 bg-white/50 dark:bg-gray-800/50 input-focus ${
                errors.thalassemia ? 'border-red-300' : 'border-gray-200 dark:border-gray-600'
              } focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200`}
            >
              <option value="">Sonuç seçin</option>
              <option value="normal">Normal</option>
              <option value="fixed_defect">Sabit Defekt</option>
              <option value="reversible_defect">Geri Dönüşümlü Defekt</option>
            </select>
          </FormField>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 pulse-on-hover disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                <span>Kalp Riskini Tahmin Et</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthForm;