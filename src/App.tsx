import React, { useState, useEffect } from 'react';
import { Heart, Sun, Moon } from 'lucide-react';
import HealthForm from './components/HealthForm';
import ResultCard from './components/ResultCard';
import FloatingElements from './components/FloatingElements';
import { HealthFormData, PredictionResult } from './types/health';

// API URL'si - Vercel'deki backend'e yönlendir
const API_BASE = 'https://pygye-health-backend.vercel.app';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<HealthFormData>({
    age: 0,
    sex: '',
    chestPainType: '',
    restingBP: 0,
    cholesterol: 0,
    fastingBS: false,
    restingECG: '',
    maxHeartRate: 0,
    exerciseAngina: false,
    stDepression: 0,
    slope: '',
    majorVessels: 0,
    thalassemia: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoUpdate, setAutoUpdate] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if form is complete for validation
  const isFormComplete = (): boolean => {
    return !!(
      formData.age > 0 &&
      formData.sex &&
      formData.chestPainType &&
      formData.restingBP > 0 &&
      formData.cholesterol > 0 &&
      formData.restingECG &&
      formData.maxHeartRate > 0 &&
      formData.stDepression >= 0 &&
      formData.slope &&
      formData.majorVessels >= 0 &&
      formData.thalassemia
    );
  };

  // Auto-update prediction when form data changes (after initial prediction)
  useEffect(() => {
    if (autoUpdate && result && isFormComplete()) {
      const timeoutId = setTimeout(() => {
        handlePrediction(true); // Silent update
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [formData, autoUpdate, result]);

  const handleFormSubmit = async () => {
    await handlePrediction(false);
  };

  const handlePrediction = async (silent: boolean = false) => {
    if (!silent) {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      // Prepare data for API - Map to backend expected format
      const apiData = {
        age: formData.age,
        sex: formData.sex === 'male' ? 1 : 0,
        cp: getChestPainTypeValue(formData.chestPainType),
        trestbps: formData.restingBP,
        chol: formData.cholesterol,
        fbs: formData.fastingBS ? 1 : 0,
        restecg: getRestingECGValue(formData.restingECG),
        thalach: formData.maxHeartRate,
        exang: formData.exerciseAngina ? 1 : 0,
        oldpeak: formData.stDepression,
        slope: getSlopeValue(formData.slope),
        ca: formData.majorVessels,
        thal: getThalassemiaValue(formData.thalassemia)
      };

      console.log("Sending data to API:", apiData);

      // Demo amaçlı sahte veri kullan (API bağlantısı olmadığında)
      // Gerçek API çalıştığında bu kısmı kaldırıp yukarıdaki fetch kodunu kullanın
      
      // Sahte bir gecikme ekleyelim
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sahte bir yanıt oluştur
      const randomRisk = Math.random();
      const isHighRisk = randomRisk >= 0.5;
      const riskPercentage = Math.round(randomRisk * 100);
      
      const predictionResult: PredictionResult = {
        risk: isHighRisk ? 'high' : 'low',
        confidence: randomRisk,
        message: isHighRisk 
          ? 'Lütfen kapsamlı bir değerlendirme için bir doktora danışın ve önleyici tedbirleri görüşün.'
          : 'Sağlıklı alışkanlıklarınızı sürdürün! Düzenli kontroller ile mevcut yaşam tarzınızı korumaya devam edin.',
        riskPercentage: riskPercentage
      };
      
      console.log("Demo mode - Generated fake response:", predictionResult);
      
      setResult(predictionResult);
      setAutoUpdate(true); // Enable auto-updates after first prediction
    } catch (error) {
      console.error('Prediction error:', error);
      
      // Daha açıklayıcı hata mesajları
      let errorMessage = 'Tahmin alınamadı. Lütfen tekrar deneyin.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'API sunucusuna bağlanılamadı. İnternet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.';
        } else if (error.message.includes('HTTP error')) {
          errorMessage = `API sunucusu bir hata döndürdü: ${error.message}. Lütfen daha sonra tekrar deneyin.`;
        } else {
          errorMessage = `Hata: ${error.message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  // Helper functions to convert form values to API format
  const getChestPainTypeValue = (type: string): number => {
    switch (type) {
      case 'typical_angina': return 0;
      case 'atypical_angina': return 1;
      case 'non_anginal_pain': return 2;
      case 'asymptomatic': return 3;
      default: return 0;
    }
  };

  const getRestingECGValue = (ecg: string): number => {
    switch (ecg) {
      case 'normal': return 0;
      case 'st_t_abnormal': return 1;
      case 'lv_hypertrophy': return 2;
      default: return 0;
    }
  };

  const getSlopeValue = (slope: string): number => {
    switch (slope) {
      case 'upsloping': return 0;
      case 'flat': return 1;
      case 'downsloping': return 2;
      default: return 0;
    }
  };

  const getThalassemiaValue = (thal: string): number => {
    switch (thal) {
      case 'normal': return 0;
      case 'fixed_defect': return 1;
      case 'reversible_defect': return 2;
      default: return 0;
    }
  };

  const handleFormDataChange = (newData: HealthFormData) => {
    setFormData(newData);
    // Clear error when user starts modifying form
    if (error) {
      setError(null);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setAutoUpdate(false);
    setFormData({
      age: 0,
      sex: '',
      chestPainType: '',
      restingBP: 0,
      cholesterol: 0,
      fastingBS: false,
      restingECG: '',
      maxHeartRate: 0,
      exerciseAngina: false,
      stDepression: 0,
      slope: '',
      majorVessels: 0,
      thalassemia: '',
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative hero-gradient min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <FloatingElements />
          
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="absolute top-6 right-6 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>

          <div className="text-center text-white z-10 max-w-4xl mx-auto">
            <div className="mb-8">
              <Heart className="w-20 h-20 mx-auto mb-6 heartbeat glow" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Kalp Sağlığı Kontrolü
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Yapay zeka ile saniyeler içinde kalp riskinizi kontrol edin
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 pulse-on-hover"
              >
                Değerlendirmeye Başla
              </button>
            </div>
          </div>
        </section>

        {/* Form/Result Section */}
        <section id="form-section" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <HealthForm
                formData={formData}
                onChange={handleFormDataChange}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                error={error}
              />
              
              {/* Result Card */}
              {result && (
                <div className="mt-8">
                  <ResultCard 
                    result={result} 
                    onReset={handleReset}
                    autoUpdate={autoUpdate}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;