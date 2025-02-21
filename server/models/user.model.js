import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique :true
    },
    password : {
        type :String,
        required : true
    },
    role : {
        type : String,
        enum : ["ADMIN","USER"],
        default : 'USER'
    }
})


const UserModel = mongoose.model("user",userSchema)

export {UserModel}