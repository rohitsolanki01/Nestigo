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
  listingId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({ "any.invalid": "Invalid listing ID" }),

  guestId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({ "any.invalid": "Invalid guest ID" }),

  checkIn: Joi.date().required().label("Check-In Date"),
  checkOut: Joi.date()
    .greater(Joi.ref("checkIn"))
    .required()
    .label("Check-Out Date")
    .messages({ "date.greater": "Check-Out must be after Check-In" }),

  totalPrice: Joi.number().min(0).label("Total Price"),

  guests: Joi.object({
    adults: Joi.number().integer().min(1).required().label("Adult Guests"),
    children: Joi.number().integer().min(0).required().label("Children Guests"),
  }),

  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed")
    .default("pending"),
});

// ✅ Proper export of both schemas
module.exports = { listingSchema, reviewSchema,bookingSchema};
