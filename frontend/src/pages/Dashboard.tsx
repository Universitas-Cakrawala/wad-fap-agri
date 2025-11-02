import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import api from '../utils/api';
import { TrendingUp, MapPin, Users, Wheat } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Plantations',
      value: stats?.total_plantations || 0,
      icon: MapPin,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Blocks',
      value: stats?.total_blocks || 0,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Today\'s Harvest',
      value: `${stats?.total_harvest_today.toFixed(2) || 0} tons`,
      icon: Wheat,
      color: 'bg-yellow-500',
    },
    {
      name: 'This Month\'s Harvest',
      value: `${stats?.total_harvest_this_month.toFixed(2) || 0} tons`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${item.color} p-2 rounded-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {item.name}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Welcome to FAP Agri Farm Management System
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Manage your palm oil plantations efficiently. Track harvests, monitor plantation blocks,
                and manage your workforce all in one place.
              </p>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-md">
                  <h4 className="font-medium text-gray-900">Plantation Management</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Add and manage your plantation areas and blocks.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                  <h4 className="font-medium text-gray-900">Harvest Tracking</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Record harvest data with GPS coordinates and traceability.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                  <h4 className="font-medium text-gray-900">Employee Management</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your field workers and track their performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;