import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addStaff, updateStaff, deleteStaff } from '../store/slices/staffSlice';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Staff = () => {
    const dispatch = useDispatch();
    const staff = useSelector((state: RootState) => state.staff.staff);
    const fields = useSelector((state: RootState) => state.fields.fields);
    const [sortColumn, setSortColumn] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState<any>(null);

    const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'assignedFields', label: 'Assigned Fields', sortable: true },
    ];

    const filterConfig = [
        {
            key: 'role',
            label: 'Role',
            options: [
                { label: 'Manager', value: 'manager' },
                { label: 'Scientist', value: 'scientist' },
                { label: 'Field Worker', value: 'field_worker' },
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
        const selectedFields = Array.from(formData.getAll('assignedFields'));

        const staffData = {
            id: editingStaff?.id || Date.now().toString(),
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            assignedFields: selectedFields as string[],
            assignedEquipment: [],
        };

        if (editingStaff) {
            dispatch(updateStaff(staffData));
            toast.success('Staff member updated successfully');
        } else {
            dispatch(addStaff(staffData));
            toast.success('Staff member added successfully');
        }

        setShowForm(false);
        setEditingStaff(null);
    };

    const handleEdit = (staff: any) => {
        setEditingStaff(staff);
        setShowForm(true);
    };

    const handleDelete = (staff: any) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            dispatch(deleteStaff(staff.id));
            toast.success('Staff member deleted successfully');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Staff</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    <PlusCircle className="h-5 w-5" />
                    Add Staff Member
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
                            {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingStaff?.name}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    defaultValue={editingStaff?.role}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Select Role</option>
                                    <option value="manager">Manager</option>
                                    <option value="scientist">Scientist</option>
                                    <option value="field_worker">Field Worker</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Assigned Fields
                                </label>
                                <select
                                    name="assignedFields"
                                    multiple
                                    defaultValue={editingStaff?.assignedFields || []}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {fields.map(field => (
                                        <option key={field.id} value={field.id}>
                                            {field.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-sm text-gray-500">
                                    Hold Ctrl/Cmd to select multiple fields
                                </p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingStaff(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    {editingStaff ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DataTable
                columns={columns}
                data={staff}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Staff;