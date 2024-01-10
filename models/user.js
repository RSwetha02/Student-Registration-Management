const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    rno:Number,
    Student_Name:String,
            Father_Name:String,
            Mother_Name:String,
            DOB:String,
            Email:String,
            Phone_No:Number,
            Gender:String,
            Level:String,
            Department:String,
},{versionKey:false});
const User=mongoose.model('student_record',userSchema);
module.exports=User;
