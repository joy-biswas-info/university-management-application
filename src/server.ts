import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";


async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("connected");
        app.listen(config.port,()=>{
            console.log(`App listening on port ${config.port}`);
            
        })
        
    } catch (err) {
        console.log("faild",err);
        
    }
}

main();