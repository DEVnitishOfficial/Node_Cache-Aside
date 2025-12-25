import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectToDB = async () => {

    console.log('see the incoming mongo_uri', process.env.MONGO_URI);

    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        
        if(connection){
            console.log(`connected to mongodb at : ${connection.host}`)
        }
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectToDB

