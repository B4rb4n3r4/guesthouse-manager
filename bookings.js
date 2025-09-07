const express = require('express');
const router = express.Router();

// Mock database - in produzione useremo Supabase
let bookings = [];
let bookingCounter = 1;

// GET /api/bookings - Ottieni tutte le prenotazioni
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/bookings - Crea nuova prenotazione
router.post('/', (req, res) => {
  try {
    const bookingData = req.body;
    
    // Genera ID e codice prenotazione
    const newBooking = {
      id: bookingCounter++,
      bookingCode: `A20-2025-${String(bookingCounter).padStart(3, '0')}`,
      ...bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Aggiungi alla lista (in produzione salveremo su Supabase)
    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      data: newBooking,
      message: 'Prenotazione creata con successo'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/bookings/:id - Ottieni prenotazione specifica
router.get('/:id', (req, res) => {
  try {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Prenotazione non trovata'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;