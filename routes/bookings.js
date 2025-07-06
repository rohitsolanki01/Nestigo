const express = require("express");
const router = express.Router();
const wrapAsync = require("../utills/wrapAsyc.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controller/booking.js");
const { validateBoooking } = require("../middleware.js");

router.get(
  "/booking/:listingId",
  isLoggedIn,
  wrapAsync(bookingController.findListAndRenderFormForBokking)
);

router.post(
  "/listings/:id/booking",
  isLoggedIn,
  validateBoooking,
  wrapAsync(bookingController.handelPostDataOfBooking)
);

router.delete(
  "/bookings/:id",
  isLoggedIn,
  wrapAsync(bookingController.cencelBookingOfUser)
);

module.exports = router;
