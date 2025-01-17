import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addField, updateField, deleteField } from '../store/slices/fieldsSlice';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Fields = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingField, setEditingField] = useState<any>(null);

  const columns = [
    { key: 'name', label: 'Field Name', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'size', label: 'Size (acres)', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
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
    const fieldData = {
      id: editingField?.id || Date.now().toString(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      size: Number(formData.get('size')),
      status: formData.get('status') as 'active' | 'inactive',
      assignedStaff: [],
      crops: [],
    };

    if (editingField) {
      dispatch(updateField(fieldData));
      toast.success('Field updated successfully');
    } else {
      dispatch(addField(fieldData));
      toast.success('Field added successfully');
    }

    setShowForm(false);
    setEditingField(null);
  };

  const handleEdit = (field: any) => {
    setEditingField(field);
    setShowForm(true);
  };

  const handleDelete = (field: any) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      dispatch(deleteField(field.id));
      toast.success('Field deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Fields</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          Add Field
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
              {editingField ? 'Edit Field' : 'Add New Field'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingField?.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingField?.location}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size (acres)
                </label>
                <input
                  type="number"
                  name="size"
                  defaultValue={editingField?.size}
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
                  defaultValue={editingField?.status || 'active'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingField(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingField ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={fields}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Fields;