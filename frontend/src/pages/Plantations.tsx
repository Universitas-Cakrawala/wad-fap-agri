import React, { useEffect, useState } from 'react';
import { Plantation } from '../types';
import api from '../utils/api';
import { Plus, MapPin, Edit, Trash2 } from 'lucide-react';

const Plantations: React.FC = () => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlantation, setEditingPlantation] = useState<Plantation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location_lat: '',
    location_lng: '',
    area_ha: '',
    address: '',
  });

  useEffect(() => {
    fetchPlantations();
  }, []);

  const fetchPlantations = async () => {
    try {
      const response = await api.get('/plantations/');
      setPlantations(response.data);
    } catch (error) {
      console.error('Error fetching plantations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: formData.name,
        location_lat: formData.location_lat ? parseFloat(formData.location_lat) : undefined,
        location_lng: formData.location_lng ? parseFloat(formData.location_lng) : undefined,
        area_ha: formData.area_ha ? parseFloat(formData.area_ha) : undefined,
        address: formData.address || undefined,
      };

      if (editingPlantation) {
        await api.put(`/plantations/${editingPlantation.id}`, data);
      } else {
        await api.post('/plantations/', data);
      }

      fetchPlantations();
      resetForm();
    } catch (error) {
      console.error('Error saving plantation:', error);
    }
  };

  const handleEdit = (plantation: Plantation) => {
    setEditingPlantation(plantation);
    setFormData({
      name: plantation.name,
      location_lat: plantation.location_lat?.toString() || '',
      location_lng: plantation.location_lng?.toString() || '',
      area_ha: plantation.area_ha?.toString() || '',
      address: plantation.address || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plantation?')) {
      try {
        await api.delete(`/plantations/${id}`);
        fetchPlantations();
      } catch (error) {
        console.error('Error deleting plantation:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location_lat: '',
      location_lng: '',
      area_ha: '',
      address: '',
    });
    setEditingPlantation(null);
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
          <h1 className="text-2xl font-semibold text-gray-900">Plantations</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Plantation
          </button>
        </div>

        {showForm && (
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {editingPlantation ? 'Edit Plantation' : 'Add New Plantation'}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.area_ha}
                    onChange={(e) => setFormData({ ...formData, area_ha: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location_lat}
                    onChange={(e) => setFormData({ ...formData, location_lat: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location_lng}
                    onChange={(e) => setFormData({ ...formData, location_lng: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    {editingPlantation ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {plantations.map((plantation) => (
              <li key={plantation.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{plantation.name}</p>
                      <p className="text-sm text-gray-500">
                        {plantation.area_ha && `${plantation.area_ha} ha`}
                        {plantation.area_ha && plantation.address && ' • '}
                        {plantation.address}
                      </p>
                      {plantation.location_lat && plantation.location_lng && (
                        <p className="text-xs text-gray-400">
                          {plantation.location_lat}, {plantation.location_lng}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(plantation)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plantation.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {plantations.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No plantations found. Add your first plantation to get started.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plantations;