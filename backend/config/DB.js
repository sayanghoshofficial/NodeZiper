const mongoose = require("mongoose");

const connnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useCreateIndex: true,
        })
        console.log('====================================');
        console.log(`Mongo connected ${connection.connection.host}`);
        console.log('====================================');
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit();
    }
}

module.exports = connnectDB;