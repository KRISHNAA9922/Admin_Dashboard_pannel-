import { useState, useEffect } from 'react';
import api from '../services/api';

export default function OutwardForm({ onClose, fetchEntries }) {
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
  const [outDate, setOutDate] = useState('');
  const [outParticulars, setOutParticulars] = useState('');
  const [outSign, setOutSign] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); // Clear previous messages
    try {
      console.log('Submitting outward for entry:', entryId);
      console.log('Data:', { outDate, outParticulars, outSign, paidAmount, remark });
      
      const response = await api.updateOutward(entryId, { 
        outDate, 
        outParticulars, 
        outSign, 
        paidAmount, 
        remark 
      });
      
      console.log('API Response:', response);
      setMsg('Outward entry complete');
      fetchEntries();
      onClose();
      setEntryId('');
      setOutDate('');
      setOutParticulars('');
      setOutSign('');
      setPaidAmount('');
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error details:', err.response?.data);
      console.error('Status code:', err.response?.status);
      
      let errorMsg = 'Failed to submit outward entry';
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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Outward Entry</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {loadingEntries ? (
          <div className="col-span-2 border px-3 py-2 rounded-lg bg-gray-100 animate-pulse">
            Loading entries...
          </div>
        ) : (
          <select
            value={entryId}
            onChange={(e) => setEntryId(e.target.value)}
            className="col-span-2 border px-3 py-2 rounded-lg"
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
        <input type="text" placeholder="Out Date" value={outDate} onChange={(e) => setOutDate(e.target.value)} className="border px-3 py-2 rounded-lg" required />
        <input type="text" placeholder="Particulars" value={outParticulars} onChange={(e) => setOutParticulars(e.target.value)} className="border px-3 py-2 rounded-lg" required />
        <input type="text" placeholder="Sign" value={outSign} onChange={(e) => setOutSign(e.target.value)} className="border px-3 py-2 rounded-lg" required />
        <input type="number" placeholder="Paid Amount" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} className="border px-3 py-2 rounded-lg" required />
        <input type="text" placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)} className="border px-3 py-2 rounded-lg" />
        <div className="col-span-2 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
        {msg && <p className="col-span-2 text-green-600 text-center">{msg}</p>}
      </form>
    </div>
  );
}
