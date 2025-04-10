const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

// Inward
router.get('/inward', entryController.getInwardEntries);
router.post('/inward', entryController.createInward);
router.put('/inward/:id', entryController.updateInward);

// Repair
router.get('/repair', entryController.getRepairEntries);
router.put('/repair/:id', entryController.updateRepair);

// Outward
router.get('/outward', entryController.getOutwardEntries);
router.put('/outward/:id', entryController.updateOutward);

// Get all
router.get('/', entryController.getEntries);
router.get('/stats', entryController.getDashboardStats);

// Optional:
router.get('/:id', entryController.getEntryById);
router.delete('/:id', entryController.deleteEntry);

module.exports = router;
