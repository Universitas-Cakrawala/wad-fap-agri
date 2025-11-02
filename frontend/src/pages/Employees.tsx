import React, { useEffect, useState } from 'react';
import { Employee } from '../types';
import api from '../utils/api';
import { Plus, User, Edit, Trash2, Phone } from 'lucide-react';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    employee_code: '',
    position: '',
    phone: '',
    is_active: true,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/auth/users'); // Using users endpoint as employee endpoint
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      employee_code: '',
      position: '',
      phone: '',
      is_active: true,
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </button>
        </div>

        {showForm && (
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Add New Employee
              </h3>
              <div className="text-sm text-gray-600 mb-4">
                Note: Employee management is integrated with user accounts. 
                New employees should register through the authentication system.
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <li key={employee.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {employee.full_name || employee.username}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{employee.role}</span>
                        <span>{employee.email}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          employee.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Created: {new Date(employee.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => console.log('Edit employee', employee.id)}
                      className="text-primary-600 hover:text-primary-900"
                      title="Edit employee"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {employees.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No employees found. Employees are managed through user accounts.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Employees;