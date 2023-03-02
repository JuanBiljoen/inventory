const mongoose = require("mongoose");

mongoose
  .connect(
     "mongodb+srv://admin:admin@inventorycluster.7oxz8ia.mongodb.net/inventory?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection with db successful");
  })
  .catch((err) => console.log(err));