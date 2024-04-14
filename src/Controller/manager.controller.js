import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const Userdetail=async(req,res)=>{
    const alluserdetail=await User.find();
    console.log("---all the passenger detail is ",alluserdetail)
    const cookiedata01=JSON.stringify({alluserdetail});
    return res.json({alluserdetail:alluserdetail})

}
export {Userdetail}