import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string | null>;
  onFilterChange: (key: string, value: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filters:</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter.key} className="flex items-center gap-2">
              <label className="text-sm text-gray-600">{filter.label}:</label>
              <select
                value={activeFilters[filter.key] || ''}
                onChange={(e) =>
                  onFilterChange(
                    filter.key,
                    e.target.value === '' ? null : e.target.value
                  )
                }
                className="form-select rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;