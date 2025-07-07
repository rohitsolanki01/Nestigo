const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).allow(null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string()
      .valid(
        "Trending",
        "Rooms",
        "Iconic City",
        "Mountains",
        "Castles",
        "Arctic",
        "Camping",
        "Farms",
        "Forest"
      )
      .required(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

const bookingSchema = Joi.object({
  checkIn: Joi.date().required(),
  checkOut: Joi.date().required(),
  roomType: Joi.string().valid("standard", "deluxe", "suite").default("standard"),
  guests: Joi.object({
    adults: Joi.number().min(1).required(),
    children: Joi.number().min(0).default(0),
    infants: Joi.number().min(0).default(0),
  }),
  totalPrice: Joi.number().min(0).required(),
  specialRequests: Joi.string().allow("").optional(),
});


// ✅ Proper export of both schemas
module.exports = { listingSchema, reviewSchema,bookingSchema};
