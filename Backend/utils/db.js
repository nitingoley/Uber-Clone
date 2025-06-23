const mongoose = require("mongoose");

function connectedToDb() {
    mongoose.connect(process.env.MONGO_DB
    ).then(()=>    console.log('Connected to DB'))
    .catch(er=> console.log(er)
    );
};

module.exports = connectedToDb;