const express = require('express');
const router = express.Router();
const { getAll, create, remove, getAllBookings, createBooking } = require('../controllers/hallController');

router.get('/', getAll);
router.post('/', create);
router.delete('/:id', remove);
router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);

module.exports = router;