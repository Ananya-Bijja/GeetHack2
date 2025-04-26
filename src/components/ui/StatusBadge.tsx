import React from 'react';

type StatusType = 'improving' | 'stable' | 'concerning' | 'critical';

interface StatusBadgeProps {
  status?: StatusType;  // Make status optional
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status = 'stable', className = '' }) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case 'improving':
        return 'bg-success-100 text-success-800';
      case 'stable':
        return 'bg-primary-100 text-primary-800';
      case 'concerning':
        return 'bg-warning-100 text-warning-800';
      case 'critical':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (): string => {
    switch (status) {
      case 'improving':
        return '↑';
      case 'stable':
        return '→';
      case 'concerning':
        return '!';
      case 'critical':
        return '!!';
      default:
        return '';
    }
  };

  return (
    <span className={`badge ${getStatusStyles()} ${className}`}>
      <span className="mr-1">{getStatusIcon()}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
