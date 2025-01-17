export interface User {
  id: string;
  name: string;
  role: 'manager' | 'admin' | 'scientist';
  email: string;
}

export interface Field {
  id: string;
  name: string;
  location: string;
  size: number;
  assignedStaff: string[];
  crops: string[];
  status: 'active' | 'inactive';
}

export interface Crop {
  id: string;
  name: string;
  fieldId: string;
  plantedDate: string;
  expectedHarvestDate: string;
  status: 'growing' | 'harvested' | 'failed';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  assignedFields: string[];
  assignedEquipment: string[];
}

export interface Vehicle {
  id: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance';
  assignedField?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance';
  assignedTo?: string;
}

export interface Log {
  id: string;
  fieldId: string;
  timestamp: string;
  type: 'inspection' | 'maintenance' | 'harvest';
  description: string;
  createdBy: string;
}