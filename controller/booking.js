const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

module.exports.findListAndRenderFormForBokking = async (req,res) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to book a listing");
        return res.redirect("/login");
    }
    try {
        let { listingId } = req.params;
        if(!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
            req.flash("error", "Valid listing ID is required");
            return res.redirect("/listings");
        }
        let listing = await Listing.findById(listingId);
        if(!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        res.render("booking/booking.ejs", {listing});
    } catch(err) {
        console.error("Error finding listing:", err);
        req.flash("error", "Error loading booking page");
        res.redirect("/listings");
    }
}

module.exports.handelPostDataOfBooking = async (req,res) => {
    try {
        const listingId = req.params.id;
        if(!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
            req.flash("error", "Valid listing ID is required");
            return res.redirect("/listings");
        }
        
        const guestId = req.user._id;
        const { checkIn, checkOut, guests, totalPrice , paymentStatus } = req.body;

        const newBooking = new Booking({
            listingId,
            guestId,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            paymentStatus: "pending",
        });

        await newBooking.save();
        req.flash("success", "Booking successfully created");
        res.redirect(`/listings/${listingId}`);
    } catch (err) {
        console.error("Booking creation error:", err);
        const errorMessage = err.name === 'CastError' 
            ? "Invalid ID format" 
            : err.message;
        req.flash("error", `Booking failed: ${errorMessage}`);
        res.redirect(`/listings/${req.params.id || ''}`);
    }
}

module.exports.cencelBookingOfUser = async (req,res) => {
    try {
        const { id } = req.params;
        
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            req.flash("error", "Invalid booking ID format");
            return res.redirect("/user/bookings");
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            req.flash("error", "Booking not found");
            return res.redirect("/user/bookings");
        }

        if (!booking.guestId.equals(req.user._id)) {
            req.flash("error", "You can only cancel your own bookings");
            return res.redirect("/user/bookings");
        }

        await Booking.findByIdAndDelete(id);
        
        req.flash("success", "Booking cancelled successfully");
        res.redirect("/user/:id/booking");
    } catch (error) {
        console.error("Booking cancellation error:", error);
        const errorMessage = error.name === 'CastError' 
            ? "Invalid booking ID format" 
            : error.message;
        req.flash("error", `Failed to cancel booking: ${errorMessage}`);
        res.redirect("/user/bookings");
    }
}