import React from 'react';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';

interface RecoveryTrendChartProps {
  data: {
    dates: string[];
    painLevels: number[];
    medicationAdherence: number[];
    symptomsCount: number[];
    overallStatus: 'improving' | 'stable' | 'concerning' | 'critical';
    score: number;
  };
}

const RecoveryTrendChart: React.FC<RecoveryTrendChartProps> = ({ data }) => {
  // This would normally be implemented with a proper charting library
  // like Chart.js, Recharts, or ApexCharts in a production app
  
  const maxPain = Math.max(...data.painLevels);
  const minPain = Math.min(...data.painLevels);
  const painTrend = maxPain - minPain > 1
    ? data.painLevels[data.painLevels.length - 1] < data.painLevels[0]
      ? 'improving'
      : 'worsening'
    : 'stable';
    
  const adherenceTrend = data.medicationAdherence[data.medicationAdherence.length - 1] > 90
    ? 'excellent'
    : data.medicationAdherence[data.medicationAdherence.length - 1] > 70
      ? 'good'
      : 'needs improvement';
  
  return (
    <Card 
      title="Recovery Progress"
      className="h-full"
      footer={
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Recovery Score</span>
            <div className="flex items-center mt-1">
              <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-2 ${
                    data.score >= 75 
                      ? 'bg-success-500' 
                      : data.score >= 50 
                        ? 'bg-warning-500' 
                        : 'bg-error-500'
                  }`}
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{data.score}/100</span>
            </div>
          </div>
          <StatusBadge status={data.overallStatus} className="text-sm px-3 py-1" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Chart mockup - would use a real chart library in production */}
        <div className="h-48 w-full flex items-end justify-between p-2 border-b border-l border-gray-300 relative">
          {data.dates.map((date, i) => (
            <div key={i} className="flex flex-col items-center w-1/7">
              <div className="relative h-36 w-4 flex flex-col-reverse mb-1">
                <div
                  className="w-4 bg-primary-500 rounded-t"
                  style={{ height: `${(data.painLevels[i] / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 transform -rotate-45 origin-top-left mt-2">
                {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
          
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-2">
            <span className="text-xs text-gray-500">10</span>
            <span className="text-xs text-gray-500">5</span>
            <span className="text-xs text-gray-500">0</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Pain Level Trend</h4>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {painTrend === 'improving' 
                  ? 'Pain levels are decreasing, showing good recovery progress.'
                  : painTrend === 'worsening'
                    ? 'Pain levels are increasing, might require attention.'
                    : 'Pain levels are stable.'
                }
              </p>
              <span className={`text-sm font-medium ${
                painTrend === 'improving' 
                  ? 'text-success-600' 
                  : painTrend === 'worsening'
                    ? 'text-error-600'
                    : 'text-primary-600'
              }`}>
                {painTrend === 'improving' ? '↓ Decreasing' : painTrend === 'worsening' ? '↑ Increasing' : '→ Stable'}
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">Medication Adherence</h4>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {adherenceTrend === 'excellent' 
                  ? 'Excellent medication adherence, continue the good work!'
                  : adherenceTrend === 'good'
                    ? 'Good medication adherence, try to be more consistent.'
                    : 'Medication adherence needs improvement.'
                }
              </p>
              <span className={`text-sm font-medium ${
                adherenceTrend === 'excellent' 
                  ? 'text-success-600' 
                  : adherenceTrend === 'good'
                    ? 'text-warning-600'
                    : 'text-error-600'
              }`}>
                {data.medicationAdherence[data.medicationAdherence.length - 1]}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecoveryTrendChart;