const mongoose=require("mongoose");
const DB=process.env.DB;
mongoose.set('strictQuery',false);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log("no connection with database",err);
})