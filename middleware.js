const { listingSchema } = require('./schema.js');
const expressError = require("./utills/expressError.js");
const Listing = require("./models/listing");
const {  reviewSchema } = require('./schema.js');
const { model } = require('mongoose');
const Review = require("./models/review.js");
const {bookingSchema} = require("./schema.js")


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "Please Login!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner = async (req,res,next) => {
  let { id } = req.params;  
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currentUser._id)){
    req.flash("error" , "You don't have permission");
return res.redirect(`/listings/${id}`);
  }

  next();
};


//listing Schema
module.exports.validateListing  = (req,res,next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errMess = error.details.map( (el) => el.message).join(",");
    throw new expressError(400 , errMess);
  }
  else{
    next();
  }
}

//review Schmema

module.exports.validateRiviews = (req,res,next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMess = error.details.map( (el) => el.message).join(",");
    throw new expressError(400 , errMess);
  }
  else{
    next();
  }
}


//for check is auther is same to the corrent User 


module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId); 

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateBoooking = async (req,res,next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    let errMess = error.details.map((el) => el.message).join(",");
    throw new expressError(400, errMess);
  } else {
    next();
  }
}
c