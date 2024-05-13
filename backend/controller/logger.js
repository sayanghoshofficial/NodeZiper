const {createLogger,transports, format, level} = require('winston');
require('winston-mongodb');
const env = require("dotenv");
env.config();


const userLogger = createLogger({
    transports:[
        new transports.File({
            filename:'coustomer.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level:'info',
            db:process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true 
            },
            collection:'Success Log',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level:'error',
            db:process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true 
            },
            collection:'Error Log',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'coustomer_error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
    ]
})

module.exports = {userLogger};