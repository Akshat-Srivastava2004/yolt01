import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const BusFacultySchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    Pin:{
        type:String,
        required:true
    }
},{timestamps:true})

BusFacultySchema.pre("save", async function (next) {
    if (!this.isModified("Pin")) return next();
    //console.log(this.Pin); // This will run only when the user changes the password
    this.Pin = await bcrypt.hash(this.Pin, 10);
    //console.log(Pin,this.Pin) // Encrypting the password
    next(); // Use for middleware
});

/*userSchema.methods.isPasswordCorrect = async function(Pin) {
    return await bcrypt.compare(Pin, this.Pin);
    // Comparing the password at the time of login
};*/
BusFacultySchema.methods.isPinCorrect = async function(Pin) {
    // Check if Pin is provided
    if (!Pin) {
        throw new Error("Pin is required for comparison.");
    }
    // Check if this.Pin is set
    if (!this.Pin) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Pin, this.Pin);
};



export const Busfaculty=mongoose.model("Busfaculty",BusFacultySchema)      