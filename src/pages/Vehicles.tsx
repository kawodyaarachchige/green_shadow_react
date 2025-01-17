import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addVehicle, updateVehicle, deleteVehicle } from '../store/slices/vehiclesSlice';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [sortColumn, setSortColumn] = useState<string>('type');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);

  const columns = [
    { key: 'type', label: 'Vehicle Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'assignedField', label: 'Assigned Field', sortable: true },
  ];

  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'In Use', value: 'in-use' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      options: [
        { label: 'Tractor', value: 'tractor' },
        { label: 'Harvester', value: 'harvester' },
        { label: 'Truck', value: 'truck' },
      ],
    },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vehicleData = {
      id: editingVehicle?.id || Date.now().toString(),
      type: formData.get('type') as string,
      status: formData.get('status') as 'available' | 'in-use' | 'maintenance',
      assignedField: formData.get('assignedField') as string,
    };

    if (editingVehicle) {
      dispatch(updateVehicle(vehicleData));
      toast.success('Vehicle updated successfully');
    } else {
      dispatch(addVehicle(vehicleData));
      toast.success('Vehicle added successfully');
    }

    setShowForm(false);
    setEditingVehicle(null);
  };

  const handleEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDelete = (vehicle: any) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      dispatch(deleteVehicle(vehicle.id));
      toast.success('Vehicle deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicles</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          Add Vehicle
        </button>
      </div>

      <FilterBar
        filters={filterConfig}
        activeFilters={{}}
        onFilterChange={() => {}}
      />

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>
                <select
                  name="type"
                  defaultValue={editingVehicle?.type}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Type</option>
                  <option value="tractor">Tractor</option>
                  <option value="harvester">Harvester</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingVehicle?.status || 'available'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned Field
                </label>
                <select
                  name="assignedField"
                  defaultValue={editingVehicle?.assignedField}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">None</option>
                  {fields.map(field => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingVehicle(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingVehicle ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={vehicles}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Vehicles;