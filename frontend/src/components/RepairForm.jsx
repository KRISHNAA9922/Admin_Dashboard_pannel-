import { useState, useEffect } from 'react';
import api from '../services/api';

export default function RepairForm({ onClose, fetchEntries }) {
  const [entryId, setEntryId] = useState('');
  const [inwardEntries, setInwardEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);

  useEffect(() => {
    const fetchInwardEntries = async () => {
      try {
        const response = await api.getInwardEntries();
        setInwardEntries(response.data);
      } catch (error) {
        console.error('Error fetching inward entries:', error);
        setMsg('Failed to load entries. Please try again.');
      } finally {
        setLoadingEntries(false);
      }
    };
    fetchInwardEntries();
  }, []);
  const [repairDate, setRepairDate] = useState('');
  const [repairDetails, setRepairDetails] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); // Clear previous messages
    try {
      console.log('Submitting repair for entry:', entryId);
      console.log('Data:', { repairDate, repairDetails });
      
      const response = await api.updateRepair(entryId, { 
        repairDate, 
        repairDetails 
      });
      
      console.log('API Response:', response);
      setMsg('Repair details updated successfully');
      fetchEntries();
      onClose();
      setEntryId('');
      setRepairDetails('');
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error details:', err.response?.data);
      console.error('Status code:', err.response?.status);
      
      let errorMsg = 'Failed to update repair details';
      if (err.response) {
        if (err.response.status === 401) {
          errorMsg = 'Please login again';
        } else if (err.response.data?.error) {
          errorMsg = err.response.data.error;
        } else if (err.response.status === 404) {
          errorMsg = 'Entry not found';
        }
      } else if (err.request) {
        errorMsg = 'No response from server - check connection';
      }
      
      setMsg(errorMsg);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Repair Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Inward Entry</label>
          {loadingEntries ? (
            <div className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 animate-pulse">
              Loading entries...
            </div>
          ) : (
            <select
              value={entryId}
              onChange={(e) => setEntryId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select an entry</option>
              {inwardEntries.map((entry) => (
                <option key={entry._id} value={entry._id}>
                  {entry.name || `Entry ${entry._id.substring(0, 6)}`}
                </option>
              ))}
            </select>
          )}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Repair Date</label>
          <input
            type="date"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Repair Details</label>
          <textarea
            placeholder="Enter repair details"
            value={repairDetails}
            onChange={(e) => setRepairDetails(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
  
        {msg && (
          <p className="text-center text-green-600 font-medium">{msg}</p>
        )}
  
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
