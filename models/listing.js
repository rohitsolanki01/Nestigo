const mongoose = require("mongoose");
const { type } = require("../schema");
const Review = require("./review")
const User = require("./user");
const { number, string } = require("joi");
const Schema = mongoose;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    filename: {
      type: String,
      default: "defaultImage"
    },
    url: {
      type: String,
      default: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      set: function (v) {
        return v && v.trim() !== ""
          ? v
          : "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
      }
    }
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews : [
  {
    type : Schema.Types.ObjectId,
    ref : "Review",
    required: true
  },
],  
owner:{
  type : Schema.Types.ObjectId,
  ref : "User"
},
category : {
  type : String,
  enum: [
    'Trending',
    'Rooms',
    'Iconic City',
    'Mountains',
    'Castles',
    'Arctic',
    'Camping',
    'Farms',
    'Forest'
  ],
}

});

listingSchema.post("findOneAndDelete" , async (listing)  => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

