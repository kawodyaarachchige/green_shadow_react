import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Sprout, Users, Truck, PenTool as Tool, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/fields', icon: Map, label: 'Fields' },
    { to: '/crops', icon: Sprout, label: 'Crops' },
    { to: '/staff', icon: Users, label: 'Staff' },
    { to: '/vehicles', icon: Truck, label: 'Vehicles' },
    { to: '/equipment', icon: Tool, label: 'Equipment' },
    { to: '/logs', icon: ClipboardList, label: 'Logs' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;