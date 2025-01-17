import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addEquipment, updateEquipment, deleteEquipment } from '../store/slices/equipmentSlice';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Equipment = () => {
  const dispatch = useDispatch();
  const equipment = useSelector((state: RootState) => state.equipment.equipment);
  const staff = useSelector((state: RootState) => state.staff.staff);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<any>(null);

  const columns = [
    { key: 'name', label: 'Equipment Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
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
        { label: 'Irrigation', value: 'irrigation' },
        { label: 'Monitoring', value: 'monitoring' },
        { label: 'Processing', value: 'processing' },
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
    const equipmentData = {
      id: editingEquipment?.id || Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      status: formData.get('status') as 'available' | 'in-use' | 'maintenance',
      assignedTo: formData.get('assignedTo') as string,
    };

    if (editingEquipment) {
      dispatch(updateEquipment(equipmentData));
      toast.success('Equipment updated successfully');
    } else {
      dispatch(addEquipment(equipmentData));
      toast.success('Equipment added successfully');
    }

    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleEdit = (equipment: any) => {
    setEditingEquipment(equipment);
    setShowForm(true);
  };

  const handleDelete = (equipment: any) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      dispatch(deleteEquipment(equipment.id));
      toast.success('Equipment deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Equipment</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          Add Equipment
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
              {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Equipment Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingEquipment?.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  defaultValue={editingEquipment?.type}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Type</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingEquipment?.status || 'available'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <select
                  name="assignedTo"
                  defaultValue={editingEquipment?.assignedTo}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">None</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEquipment(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingEquipment ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={equipment}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Equipment;