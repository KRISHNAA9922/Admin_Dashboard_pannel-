import { useEffect, useState } from 'react';
import api from '../services/api';
import RepairForm from '../components/RepairForm';

const Repair = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await api.getRepairEntries();
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching repair entries:', error);
      setEntries([]);
    }
  };

  const handleRepairUpdate = async (id) => {
    try {
      await api.updateRepair(id, { status: 'Repaired' });
      fetchEntries();
    } catch (error) {
      console.error('Error updating repair status:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Repair Page</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            + Add For Repair
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">Repair Date</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{e.name}</td>
                    <td className="p-4">{e.repairDate || '-'}</td>
                    <td className="p-4">{e.status}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRepairUpdate(e._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        Mark as Repaired
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
            <RepairForm
              onClose={() => setShowModal(false)}
              fetchEntries={fetchEntries}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Repair;