const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utills/wrapAsyc.js");
const {validateRiviews , isLoggedIn ,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js");


router.post("/" , isLoggedIn,validateRiviews , wrapAsync (reviewController.reviews));


// reviews delete route 
router.delete
("/:reviewId" ,
  isLoggedIn,
  isReviewAuthor,
   wrapAsync(reviewController.destroyReview))

module.exports = router;