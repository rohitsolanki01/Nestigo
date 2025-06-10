const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const initData = require("./data.js")

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/nestigo');
}
main().then(res => {
    console.log("mongoDb connnected");
}).catch(err => {
    console.log(err);
});


const initDb = async () => {
    await Listing.deleteMany({});
     initData.data = initData.data.map((obj) => ({
        ...obj,
        owner : '683d821aa94af45aad5a8e94',
     }))
    await Listing.insertMany(initData.data);
    console.log("data was initialzaed");
    
}

initDb();