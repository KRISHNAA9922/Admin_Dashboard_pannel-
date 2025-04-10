const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: String,
  name: String,
  mobile: String,
  qty: Number,
  particulars: String,
  sign: String,
  // Inward
  inNo: String,
  inDate: String,
  totalAmount: Number,
  paidAmount: Number,
  pendingAmount: Number,
  // Repair   
  repairDate: String,
  repairDetails: String,
  // Outward
  outDate: String,
  outParticulars: String,
  outSign: String,
  // Status
  status: {
    type: String,
    enum: ["Pending", "Partially Paid", "Complete"],
    default: "Pending"
  },
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);