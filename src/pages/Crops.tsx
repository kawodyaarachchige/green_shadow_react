import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCrop, updateCrop, deleteCrop } from '../store/slices/cropsSlice';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Crops = () => {
  const dispatch = useDispatch();
  const crops = useSelector((state: RootState) => state.crops.crops);
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<any>(null);

  const columns = [
    { key: 'name', label: 'Crop Name', sortable: true },
    { key: 'fieldId', label: 'Field', sortable: true },
    { key: 'plantedDate', label: 'Planted Date', sortable: true },
    { key: 'expectedHarvestDate', label: 'Expected Harvest', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Growing', value: 'growing' },
        { label: 'Harvested', value: 'harvested' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      key: 'fieldId',
      label: 'Field',
      options: fields.map(field => ({
        label: field.name,
        value: field.id,
      })),
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
    const cropData = {
      id: editingCrop?.id || Date.now().toString(),
      name: formData.get('name') as string,
      fieldId: formData.get('fieldId') as string,
      plantedDate: formData.get('plantedDate') as string,
      expectedHarvestDate: formData.get('expectedHarvestDate') as string,
      status: formData.get('status') as 'growing' | 'harvested' | 'failed',
    };

    if (editingCrop) {
      dispatch(updateCrop(cropData));
      toast.success('Crop updated successfully');
    } else {
      dispatch(addCrop(cropData));
      toast.success('Crop added successfully');
    }

    setShowForm(false);
    setEditingCrop(null);
  };

  const handleEdit = (crop: any) => {
    setEditingCrop(crop);
    setShowForm(true);
  };

  const handleDelete = (crop: any) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      dispatch(deleteCrop(crop.id));
      toast.success('Crop deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Crops</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          Add Crop
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
              {editingCrop ? 'Edit Crop' : 'Add New Crop'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Crop Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingCrop?.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field
                </label>
                <select
                  name="fieldId"
                  defaultValue={editingCrop?.fieldId}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Field</option>
                  {fields.map(field => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Planted Date
                </label>
                <input
                  type="date"
                  name="plantedDate"
                  defaultValue={editingCrop?.plantedDate}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Harvest Date
                </label>
                <input
                  type="date"
                  name="expectedHarvestDate"
                  defaultValue={editingCrop?.expectedHarvestDate}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingCrop?.status || 'growing'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="growing">Growing</option>
                  <option value="harvested">Harvested</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCrop(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingCrop ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={crops}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Crops;