import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LayoutDashboard, Map, Sprout, Users, Truck, PenTool as Tool, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const fields = useSelector((state: RootState) => state.fields.fields);
  const crops = useSelector((state: RootState) => state.crops.crops);
  const staff = useSelector((state: RootState) => state.staff.staff);

  const stats = [
    {
      title: 'Total Fields',
      value: fields.length,
      icon: Map,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Crops',
      value: crops.filter(crop => crop.status === 'growing').length,
      icon: Sprout,
      color: 'bg-green-500',
    },
    {
      title: 'Staff Members',
      value: staff.length,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-md ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-3">
            {/* Add activity items here */}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            System Alerts
          </h2>
          <div className="space-y-3">
            {/* Add alert items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;