import React from 'react';
import { Activity } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Activity className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
      <span className="ml-2 text-xl font-bold text-gray-900">RecoveryTrack</span>
    </div>
  );
};

export default Logo;