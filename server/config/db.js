import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const connectDataBase = async() => {
    try{ 
        await mongoose.connect(dbUrl).then(()=> console.log("MongoDb Conncecte Successfully"));
    }catch(err){
        console.log(err.message || err)
        process.exit(1);
    }
}

export {connectDataBase}