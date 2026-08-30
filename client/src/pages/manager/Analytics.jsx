import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import Card from '../../components/cards/Card';
import { BarChart3, Activity, Clock } from 'lucide-react';

export const ManagerAnalytics = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Mandi Operational Analytics" subtitle="Throughput metrics, hourly peak times, and quality rejection ratios" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Peak Traffic Hour" value="10:00 AM - 12:00 PM" subtitle="34 Trucks / hour" icon={Clock} color="amber" />
        <StatsCard title="Average Processing Time" value="14.2 Mins" subtitle="Per Vehicle Entry to Exit" icon={Activity} color="emerald" />
        <StatsCard title="Quality Approval Rate" value="96.2%" subtitle="Below 14% Moisture" icon={BarChart3} color="blue" />
      </div>
    </div>
  );
};

export default ManagerAnalytics;
