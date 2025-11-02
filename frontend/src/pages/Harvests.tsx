import React, { useEffect, useState } from 'react';
import { HarvestRecord, Block, User } from '../types';
import api from '../utils/api';
import { Plus, Wheat, Calendar, MapPin, User as UserIcon } from 'lucide-react';

const Harvests: React.FC = () => {
  const [harvests, setHarvests] = useState<HarvestRecord[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    block_id: '',
    harvester_id: '',
    date: new Date().toISOString().split('T')[0],
    tonnes_fresh_fruit_bunches: '',
    geo_lat: '',
    geo_lng: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [harvestsRes, blocksRes, usersRes] = await Promise.all([
        api.get('/harvests/'),
        api.get('/plantations/'), // We'll need to get blocks differently
        api.get('/auth/users')
      ]);
      
      setHarvests(harvestsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        block_id: formData.block_id,
        harvester_id: formData.harvester_id,
        date: new Date(formData.date).toISOString(),
        tonnes_fresh_fruit_bunches: parseFloat(formData.tonnes_fresh_fruit_bunches),
        geo_lat: formData.geo_lat ? parseFloat(formData.geo_lat) : undefined,
        geo_lng: formData.geo_lng ? parseFloat(formData.geo_lng) : undefined,
        notes: formData.notes || undefined,
      };

      await api.post('/harvests/', data);
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving harvest:', error);
      alert('Error saving harvest. Please check your input.');
    }
  };

  const resetForm = () => {
    setFormData({
      block_id: '',
      harvester_id: '',
      date: new Date().toISOString().split('T')[0],
      tonnes_fresh_fruit_bunches: '',
      geo_lat: '',
      geo_lng: '',
      notes: '',
    });
    setShowForm(false);
  };

  const getHarvesterName = (harvesterId: string) => {
    const user = users.find(u => u.id === harvesterId);
    return user ? (user.full_name || user.username) : 'Unknown';
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
          <h1 className="text-2xl font-semibold text-gray-900">Harvest Records</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Harvest
          </button>
        </div>

        {showForm && (
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Record New Harvest
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Block ID</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter block ID"
                    value={formData.block_id}
                    onChange={(e) => setFormData({ ...formData, block_id: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Harvester</label>
                  <select
                    required
                    value={formData.harvester_id}
                    onChange={(e) => setFormData({ ...formData, harvester_id: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select harvester</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.full_name || user.username} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fresh Fruit Bunches (Tonnes)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.tonnes_fresh_fruit_bunches}
                    onChange={(e) => setFormData({ ...formData, tonnes_fresh_fruit_bunches: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude (Optional)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.geo_lat}
                    onChange={(e) => setFormData({ ...formData, geo_lat: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude (Optional)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.geo_lng}
                    onChange={(e) => setFormData({ ...formData, geo_lng: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                    Record Harvest
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {harvests.map((harvest) => (
              <li key={harvest.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wheat className="h-5 w-5 text-primary-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Batch: {harvest.batch_code}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(harvest.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1" />
                            {getHarvesterName(harvest.harvester_id)}
                          </span>
                          <span>{harvest.tonnes_fresh_fruit_bunches} tonnes</span>
                        </div>
                        {harvest.geo_lat && harvest.geo_lng && (
                          <p className="text-xs text-gray-400 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {harvest.geo_lat}, {harvest.geo_lng}
                          </p>
                        )}
                        {harvest.notes && (
                          <p className="text-xs text-gray-600 mt-1">{harvest.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Block: {harvest.block_id}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(harvest.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {harvests.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No harvest records found. Record your first harvest to get started.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Harvests;