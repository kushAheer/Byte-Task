import mongoose from "mongoose";
 
const appDbContext = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
    }
    catch(error){
        console.log(error);
    }
};

export default appDbContext;