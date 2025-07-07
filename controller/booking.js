const Booking = require("../models/booking");
const Listing = require("../models/listing");
const mongoose = require("mongoose");




module.exports.findListAndRenderFormForBooking = async (req, res) => {
  try {
    const { listingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      req.flash("error", "Invalid listing ID");
      return res.redirect("/listings");
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    res.render("booking/booking.ejs", { listing });
  } catch (err) {
    console.error(err);
    req.flash("error", "Server error loading booking form");
    res.redirect("/listings");
  }
};


module.exports.createBooking = async (req, res) => {
  try {
    const { id } = req.params; // listingId
    const guestId = req.user._id;
    const { checkIn, checkOut, guests, roomType, totalPrice, specialRequests } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const totalNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const booking = new Booking({
      listingId: id,
      guestId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      roomType,
      totalNights,
      totalPrice,
      paymentStatus: "pending",
      specialRequests,
    });

    await booking.save();
    req.flash("success" , "Booking Successfully Created")
    res.redirect("/listings")
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ guestId: userId }).populate("listingId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("listingId");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving booking" });
  }
};

module.exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid booking ID");
      return res.redirect("/user/bookings");
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/user/bookings");
    }

    if (!booking.guestId.equals(req.user._id)) {
      req.flash("error", "Unauthorized: Not your booking");
      return res.redirect("/user/bookings");
    }

    await Booking.findByIdAndDelete(id);

    req.flash("success", "Booking Successfully delete");
    return    res.redirect("/user/:id/booking");
  } catch (error) {
    console.error("Booking delete error:", error);
    req.flash("error", "Something went wrong while deleting");
    return res.redirect("/user/bookings");
  }
};
