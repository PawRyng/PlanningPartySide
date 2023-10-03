const mongoose = require('mongoose');

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
module.exports.mongoConnection = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECT, dbOptions);
    console.log('Connected with DB');
    next();
  } catch (error) {
    console.error('DB no conected ERROR ->', error);
    next(error);
  }
};
module.exports.mongoDisconnect = async (req, res, next)=>{
    try{
        mongoose.connection.close();
        console.log('DB closed!')
        next();
    }
    catch(error){
        console.error("DB no closed", error);
        next(error)
    }
}