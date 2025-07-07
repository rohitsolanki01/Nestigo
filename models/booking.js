const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    infants: {
      type: Number,
      default: 0,
    },
  },
  roomType: {
    type: String,
    enum: ["standard", "deluxe", "suite"],
    default: "standard",
  },
  totalNights: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  specialRequests: {
    type: String,
    trim: true,
  },
  bookingStatus: {
    type: String,
    enum: ["active", "cancelled", "completed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
