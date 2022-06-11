const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=> {
        console.log("Successfully connencted to database");
    })
    .catch((error) => {
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1);
    });
}