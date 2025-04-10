import { useEffect, useState } from 'react';
import api from '../services/api';
import OutwardForm from '../components/OutwardForm';
import PaymentModal from '../components/PaymentModal';

const Outward = () => {
  const [entries, setEntries] = useState([]);
  const [showOutwardModal, setShowOutwardModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const res = await api.getOutwardEntries();
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching outward entries:', error);
      setEntries([]);
    }
  };

  const handlePaymentComplete = async (amount) => {
    try {
      const parsedAmount = Number(amount);
      const updated = {
        paidAmount: Number(selectedEntry.paidAmount) + parsedAmount,
        status:
          parsedAmount ===
          Number(selectedEntry.totalAmount) - Number(selectedEntry.paidAmount)
            ? 'Complete'
            : 'Partially Paid',
      };
      await api.updateOutward(selectedEntry._id, updated);
      setShowPaymentModal(false);
      fetchEntries();
    } catch (error) {
      console.error('Error updating payment:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Outward Page</h2>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const headers = ['Name', 'Repair Date', 'Out Date', 'Out Particulars', 'Remarks', 'Pending', 'Status'];
                const csvContent = [
                  headers.join(','),
                  ...entries.map(entry => [
                    `"${entry.name}"`,
                    `"${entry.repairDate || '-'}"`,
                    `"${entry.outDate || '-'}"`,
                    `"${entry.outParticulars || '-'}"`,
                    `"${entry.remarks || '-'}"`,
                    `"${entry.totalAmount - entry.paidAmount}"`,
                    `"${entry.status}"`
                  ].join(','))
                ].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'outward_entries.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowOutwardModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              + Add Outward
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Repair Date</th>
                  <th className="p-4 font-semibold">Out Date</th>
                  <th className="p-4 font-semibold">Out Particulars</th>
                  <th className="p-4 font-semibold">Remarks</th>
                  <th className="p-4 font-semibold">Pending</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{entry.name}</td>
                    <td className="p-4">{entry.repairDate || '-'}</td>
                    <td className="p-4">{entry.outDate || '-'}</td>
                    <td className="p-4">{entry.outParticulars || '-'}</td>
                    <td className="p-4">{entry.remarks || '-'}</td>
                    <td className="p-4 text-red-600 font-medium">
                      ₹{entry.totalAmount - entry.paidAmount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          entry.status === 'Complete'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {entry.status !== 'Complete' && (
                        <button
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowPaymentModal(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                          Complete Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showOutwardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <OutwardForm onClose={() => setShowOutwardModal(false)} fetchEntries={fetchEntries} />
          </div>
        </div>
      )}

      {showPaymentModal && selectedEntry && (
        <PaymentModal
          entry={selectedEntry}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default Outward;
