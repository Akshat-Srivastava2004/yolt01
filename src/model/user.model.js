import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // for searching in a model
    },
    Name:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    PhoneNumber:{
        type:String,
        required:true,
    },
    Pin:{
        
        type:String,
        required:[true,'pin is required'],
    },
    Address:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true
}
)
userSchema.pre("save", async function (next) {
    if (!this.isModified("Pin")) return next();
    //console.log(this.Password); // This will run only when the user changes the password
    this.Pin = await bcrypt.hash(this.Pin, 10);
    console.log(this.Pin) // Encrypting the password
    next(); // Use for middleware
});

/*userSchema.methods.isPasswordCorrect = async function(Password) {
    return await bcrypt.compare(Password, this.Password);
    // Comparing the password at the time of login
};*/
userSchema.methods.isPinCorrect = async function(Pin) {
    console.log("the pin entered by the user is ",Pin)
    // Check if Password is provided
    if (!Pin) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.Pin) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Pin, this.Pin);
};



userSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.Name,
        PhoneNumber:this.PhoneNumber,
        username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    userSchema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
            _id:this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        }

 export const User=mongoose.model("User",userSchema)        