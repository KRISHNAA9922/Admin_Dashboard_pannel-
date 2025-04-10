import { useState } from 'react';

const PaymentModal = ({ entry, onClose, onComplete }) => {
  const pendingAmount = Number(entry.totalAmount) - Number(entry.paidAmount);
  const [amount, setAmount] = useState(pendingAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Amount to Pay (Pending: ₹{pendingAmount.toFixed(2)})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              max={String(pendingAmount)}
              step="0.01"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
