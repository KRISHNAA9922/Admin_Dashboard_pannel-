import { useState, useEffect } from 'react';
import api from '../services/api';

export default function InwardForm({ onClose, fetchEntries, entry }) {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    mobile: '',
    qty: 1,
    particulars: '',
    sign: '',
    inNo: '',
    inDate: '',
    totalAmount: '',
    paidAmount: '',
    status: '',
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date || '',
        name: entry.name || '',
        mobile: entry.mobile || '',
        qty: entry.qty || 1,
        particulars: entry.particulars || '',
        sign: entry.sign || '',
        inNo: entry.inNo || '',
        inDate: entry.inDate || '',
        totalAmount: entry.totalAmount || '',
        paidAmount: entry.paidAmount || '',
        status: entry.status || '',
      });
    }
  }, [entry]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        qty: Number(formData.qty),
        totalAmount: Number(formData.totalAmount),
        paidAmount: Number(formData.paidAmount),
      };

      if (entry) {
        await api.updateInward(entry._id, submissionData);
        setNotification({
          show: true,
          message: 'Inward entry updated successfully!',
          type: 'success',
        });
      } else {
        await api.createEntry(submissionData);
        setNotification({
          show: true,
          message: 'Inward entry saved successfully!',
          type: 'success',
        });
      }

      fetchEntries();
      onClose();
      if (!entry) {
        setFormData({
          date: '',
          name: '',
          mobile: '',
          qty: 1,
          particulars: '',
          sign: '',
          inNo: '',
          inDate: '',
          totalAmount: '',
          paidAmount: '',
          //status: '',
        });
      }
    } catch (err) {
      console.error(err);
      setNotification({
        show: true,
        message: 'Error saving/updating entry. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{entry ? 'Update Inward Entry' : 'Inward Entry'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ['name', 'Name', 'text'],
          ['mobile', 'Mobile', 'text'],
          ['qty', 'Qty', 'number'],
          ['particulars', 'Particulars', 'text'],
          ['sign', 'Sign', 'text'],
          ['inNo', 'In No.', 'text'],
          ['totalAmount', 'Total Amount', 'number'],
          ['paidAmount', 'Paid Amount', 'number'],
        //  ['status', 'Status', 'text'],
        ].map(([key, label, type]) => (
          <div key={key} className="col-span-1">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">In Date</label>
          <input
            type="date"
            name="inDate"
            value={formData.inDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {entry ? 'Update' : 'Submit'}
          </button>
        </div>
        {notification.show && (
          <div
            className={`mt-4 p-2 rounded text-white ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.message}
            <button
              onClick={() => setNotification({ show: false, message: '', type: 'success' })}
              className="ml-2 text-sm"
            >
              ×
            </button>
          </div>
        )}
      </form>
    </div>
  );
}