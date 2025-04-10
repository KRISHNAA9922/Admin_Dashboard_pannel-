import React, { useEffect, useState } from 'react';
import api from '../services/api';
import InwardForm from '../components/InwardForm';

const Inward = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const res = await api.getInwardEntries();
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching inward entries:', error);
      setEntries([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
      if (confirmDelete) {
        await api.deleteEntry(id);
        fetchEntries();
      }
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const handleUpdate = (entry) => {
    setEditEntry(entry);
    setShowModal(true);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Inward Entries</h2>
          <button
            onClick={() => {
              setEditEntry(null);
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            + Add
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">Mobile</th>
                  <th className="p-4 font-semibold text-gray-700">Qty</th>
                  <th className="p-4 font-semibold text-gray-700">Total</th>
                  <th className="p-4 font-semibold text-gray-700">Paid</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id} className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <td className="p-4">{entry.name}</td>
                    <td className="p-4">{entry.mobile}</td>
                    <td className="p-4">{entry.qty}</td>
                    <td className="p-4">{entry.totalAmount}</td>
                    <td className="p-4">{entry.paidAmount}</td>
                    <td className="p-4">{entry.status || 'N/A'}</td>
                    <td className="p-4 flex gap-4">
                      <button
                        onClick={() => handleUpdate(entry)}
                        className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-white bg-red-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg sm:max-w-2xl">
            <InwardForm
              onClose={() => {
                setShowModal(false);
                setEditEntry(null);
              }}
              fetchEntries={fetchEntries}
              entry={editEntry}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Inward;
