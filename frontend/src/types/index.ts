// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Plantation {
  id: string;
  name: string;
  location_lat?: number;
  location_lng?: number;
  area_ha?: number;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Block {
  id: string;
  plantation_id: string;
  name: string;
  area_ha?: number;
  planting_year?: number;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  name: string;
  employee_code: string;
  position?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HarvestRecord {
  id: string;
  block_id: string;
  harvester_id: string;
  date: string;
  tonnes_fresh_fruit_bunches: number;
  batch_code: string;
  geo_lat?: number;
  geo_lng?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_plantations: number;
  total_blocks: number;
  total_harvest_today: number;
  total_harvest_this_month: number;
}

export { API_BASE_URL };