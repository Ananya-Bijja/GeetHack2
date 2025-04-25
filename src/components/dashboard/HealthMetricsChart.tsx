import React from 'react';
import Card from '../ui/Card';

interface HealthMetricsChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}

const HealthMetricsChart: React.FC<HealthMetricsChartProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data)) * 1.1;
  
  return (
    <Card title={title}>
      <div className="w-full h-64 relative">
        {/* We would use a real chart library in a production app, this is a simplified visual representation */}
        <div className="absolute inset-0 flex items-end pb-8 px-4">
          {data.datasets[0].data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-6 bg-primary-500 rounded-t" 
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">{data.labels[index]}</div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-4 text-xs text-gray-500">
          <span>{maxValue.toFixed(0)}</span>
          <span>{(maxValue / 2).toFixed(0)}</span>
          <span>0</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center space-x-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-1`} style={{ backgroundColor: dataset.color }}></div>
            <span className="text-sm text-gray-600">{dataset.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HealthMetricsChart;