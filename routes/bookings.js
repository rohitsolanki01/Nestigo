const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking");
const { isLoggedIn } = require("../middleware");


router.get("/booking/:listingId", isLoggedIn, bookingController.findListAndRenderFormForBooking);

// Create booking
router.post("/book/:id", isLoggedIn, bookingController.createBooking);

// Get current user's bookings
router.get("/my-bookings", isLoggedIn, bookingController.getUserBookings);

// Get one booking
router.get("/booking/:id", isLoggedIn, bookingController.getBookingById);

// Cancel a booking
router.delete("/booking/:id", bookingController.deleteBooking);

module.exports = router;
