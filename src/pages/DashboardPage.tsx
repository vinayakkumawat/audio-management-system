import React from 'react';
import { QueueList } from '../components/QueueList';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Audio Queue Dashboard</h1>
      <QueueList />
    </div>
  );
};