import React from 'react';
import { Heart, Shield, AlertTriangle, RefreshCw, Info } from 'lucide-react';
import { PredictionResult } from '../types/health';

interface ResultCardProps {
  result: PredictionResult;
  onReset: () => void;
  autoUpdate?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, autoUpdate = false }) => {
  const isLowRisk = result.risk === 'low';
  const riskPercentage = result.riskPercentage || Math.round(result.confidence * 100);
  
  // Risk faktörleri açıklaması
  const getRiskFactorsExplanation = () => {
    if (isLowRisk) {
      return [
        "Meyve, sebze ve tam tahıllı gıdalardan zengin sağlıklı bir diyet sürdürün",
        "Düzenli egzersiz yapın (haftada en az 150 dakika orta yoğunlukta aktivite)",
        "Doktorunuzla düzenli kontroller planlayın",
        "Kan basıncınızı ve kolesterol seviyelerinizi takip edin"
      ];
    } else {
      return [
        "Kapsamlı bir değerlendirme için bir kardiyoloğa danışın",
        "Doymuş yağlar ve sodyum açısından düşük, kalp dostu bir diyet uygulayın",
        "Doktorunuzun önerdiği şekilde düzenli fiziksel aktivite yapın",
        "İlaçlarınızı reçete edildiği gibi alın ve hayati belirtilerinizi düzenli olarak izleyin",
        "Sigara içmeyi bırakmak ve alkol tüketimini azaltmak gibi yaşam tarzı değişiklikleri düşünün"
      ];
    }
  };

  const riskFactors = getRiskFactorsExplanation();
  
  return (
    <div className="result-slide-in">
      <div className={`glass rounded-2xl p-8 border-2 relative overflow-hidden ${
        isLowRisk 
          ? 'border-emerald-200 dark:border-emerald-400/30 risk-glow-green' 
          : 'border-red-200 dark:border-red-400/30 risk-glow-red'
      }`}>
        {/* Auto-update indicator */}
        {autoUpdate && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <RefreshCw className="w-3 h-3" />
              <span>Otomatik güncelleniyor</span>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isLowRisk 
              ? 'bg-emerald-100 dark:bg-emerald-400/20' 
              : 'bg-red-100 dark:bg-red-400/20'
          }`}>
            {isLowRisk ? (
              <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            )}
          </div>
          
          {/* Risk Status with Emoji */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">
                {isLowRisk ? '🟢' : '🔴'}
              </span>
              <h3 className={`text-2xl font-bold ${
                isLowRisk 
                  ? 'text-emerald-700 dark:text-emerald-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {isLowRisk ? 'DÜŞÜK RİSK' : 'YÜKSEK RİSK'}
              </h3>
            </div>
            
            {/* Risk Percentage */}
            <div className={`text-4xl font-bold mb-2 ${
              isLowRisk 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              %{riskPercentage}
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Risk Seviyesi
            </p>
          </div>
          
          {/* Risk Message */}
          <div className={`p-4 rounded-xl mb-6 ${
            isLowRisk 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <p className={`text-sm font-medium ${
              isLowRisk 
                ? 'text-emerald-800 dark:text-emerald-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {isLowRisk ? 'Sağlıklı alışkanlıklarınızı sürdürün!' : 'Lütfen bir doktora danışın'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {result.message}
            </p>
          </div>
          
          {/* Risk Factors and Recommendations */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Info className="w-4 h-4 text-blue-500" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {isLowRisk ? 'Öneriler' : 'Önemli Adımlar'}
              </h4>
            </div>
            <ul className="text-left text-xs space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
              {riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-gray-600 dark:text-gray-300">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={onReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 pulse-on-hover"
            >
              Yeni Değerlendirme
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              * Bu, UCI Kalp Hastalığı Veri Seti'ne dayalı bir ön değerlendirmedir. Doğru tıbbi tavsiye için her zaman bir sağlık uzmanına danışın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;