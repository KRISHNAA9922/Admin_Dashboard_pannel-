const Entry = require('../models/entryModel');

// Create Inward Entry
exports.createInward = async (req, res) => {
  try {
    const { totalAmount, paidAmount } = req.body;
    const pendingAmount = totalAmount - paidAmount;

    const status =
      pendingAmount === 0
        ? 'Complete'
        : paidAmount > 0
        ? 'Partially Paid'
        : 'Pending';

    const entry = new Entry({
      ...req.body,
      pendingAmount,
      status,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Repair Info
exports.updateRepair = async (req, res) => {
  try {
    const { repairDate, repairDetails } = req.body;
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { repairDate, repairDetails },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Outward Info & Payment
exports.updateOutward = async (req, res) => {
  try {
    const { outDate, outParticulars, outSign, paidAmount, status } = req.body;

    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    // Payment handling
    if (paidAmount !== undefined) {
      entry.paidAmount = paidAmount;
      entry.pendingAmount = entry.totalAmount - entry.paidAmount;

      if (entry.pendingAmount <= 0) {
        entry.status = 'Complete';
        entry.pendingAmount = 0;
      } else {
        entry.status = status || 'Partially Paid';
      }
    }

    // Outward info update
    if (outDate) entry.outDate = outDate;
    if (outParticulars) entry.outParticulars = outParticulars;
    if (outSign) entry.outSign = outSign;

    const updated = await entry.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Outward Entries
exports.getOutwardEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ 
      outDate: { $exists: true, $ne: null } 
    })
    .select('_id name repairDate outDate outParticulars remarks totalAmount paidAmount status')
    .sort({ outDate: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Inward Entries
exports.getInwardEntries = async (req, res) => {
  try {
    const entries = await Entry.find({
      outDate: { $exists: false }
    })
    .select('_id name mobile qty totalAmount paidAmount status') // Return all necessary fields
    .sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Repair Entries
exports.getRepairEntries = async (req, res) => {
  try {
    const entries = await Entry.find({
      repairDetails: { $exists: true, $ne: null }
    }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Get Entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalCount,
      completedCount,
      totalRevenue
    ] = await Promise.all([
      Entry.countDocuments(),
      Entry.countDocuments({ status: 'Complete' }),
      Entry.aggregate([
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ])
    ]);

    res.json({
      totalRecords: totalCount,
      completedRepairs: completedCount,
      totalRevenue: totalRevenue[0]?.total || 0,
      avgRevenue: totalCount > 0 ? Math.round(totalRevenue[0]?.total / totalCount) : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Delete Entry
exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateInward = async (req, res) => {
  try {
    const { totalAmount, paidAmount, ...otherFields } = req.body;
    const pendingAmount = totalAmount - paidAmount;

    const status =
      pendingAmount === 0
        ? 'Complete'
        : paidAmount > 0
        ? 'Partially Paid'
        : 'Pending';

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      {
        ...otherFields,
        totalAmount,
        paidAmount,
        pendingAmount,
        status
      },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
