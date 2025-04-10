// components/AddRecordModal.jsx
import { useState } from "react";
import api from "../services/api";

const AddRecordModal = ({ onClose, fetchEntries }) => {
  const [form, setForm] = useState({
    date: "",
    name: "",
    mobile: "",
    qty: "",
    particulars: "",
    inNo: "",
    totalAmount: "",
    paidAmount: "",
    remarks: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Convert numeric fields
    const submissionData = {
      ...form,
      qty: Number(form.qty),
      totalAmount: Number(form.totalAmount),
      paidAmount: Number(form.paidAmount)
    };

    console.log('Form submission started', submissionData);
    try {
      console.log('Sending data to API:', submissionData);
      const response = await api.createEntry(submissionData);
      console.log('API Response:', response);
      fetchEntries();
      onClose();
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || "Failed to add record");
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add New Record</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {["name", "mobile", "qty", "particulars", "inNo", "totalAmount", "paidAmount", "remarks"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={field}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordModal;