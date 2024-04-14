import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Busfaculty } from "../model/BusFaculty.model.js";
const registerUser=asyncHandler(async(req,res)=>{
    const {Name,username,PhoneNumber,Pin,Address}=req.body
   
        if(Name===""){
            throw new ApiError(400,"Name is required ")
        }
        if(PhoneNumber===""){
            throw new ApiError(400,"Phonenumber  is required")
        }
        if(Pin===""){
            throw new ApiError(400,"Pin is required")
        }
        if(Address===""){
            throw new ApiError(400,"Address is required ")
        }
        if(username===""){
            throw new ApiError(400,"username is required")
        }

    
        const existeduser=await User.findOne({
            $or:[{username}]
        })
        
        if(existeduser){
            throw new ApiError(409,"user already existed with this username")
        }
        

      

        const  user=await User.create({
            Name,
            username,
            Pin,
            Address,
            PhoneNumber
        })

        const createdUser=await User.findById(user._id).select(
            "-Password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500,"Sorry unable to register user ")
        }
        res.redirect('/login.html');
    
})

const generateAcessTokenAndRefereshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        console.log(user);
        const accessToken=user.generateAcessToken()
        const refreshToken=user.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        user.refreshToken=refreshToken;
        await user.save();
       console.log("token aagya hai wth ")
        // console.log(refreshToken)
        // await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"somethning went wrong  while generating tokens")
    }
    }











const loginuser=(async(req,res)=>{
    const {username,Pin}=req.body
    console.log(username,Pin)
    
    if(!username){
        throw new ApiError(400,"Username is required")
    }
    const user=await User.findOne({
        $or:[{username}]
    })
    if(!user){
        throw new ApiError(400,"user doesnot exist with this username and email")
    }
    const isPinvalid=await user.isPinCorrect(Pin)
    console.log(isPinvalid)

    if(!isPinvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAcessTokenAndRefereshTokens(user._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedInUser=await User.findById(user._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedInUser)
 
     const options={
         httpOnly:true,
         secure:true
     }


                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .redirect('/userdashboard.html');
//      .json(
//          new ApiResponse(
//              201,{
//                  // data 
//                  user:loggedInUser,accessToken,
//                  refreshToken,
//              },
//              "user logged in succesfully "
//          )
//      )
     
})
const Busfacultylogin=async(req,res)=>{
    const {username,Pin}=req.body;
    console.log(username,Pin)
    try {
        if(!username){
            throw new ApiError(501,"adminame is required ")
        }
        if(!Pin){
            throw new ApiError(501,"Password is required ")
        }
        const Busfacultyexist=await Busfaculty.findOne({
            $or:[{username}]
        })
        if(!Busfacultyexist){
            throw new ApiError(501,"Admin doest not exist with the given name in database")
        }
        const Busfacultyexistpasswordcheckig= await Busfacultyexist.isPinCorrect(Pin)
        console.log("the actual pasword is ", Busfacultyexistpasswordcheckig)
           
       if(!Busfacultyexistpasswordcheckig){
        throw new ApiError(400,"password is incorrect try again ")
       }

       return res
       .redirect('/manager.html')

    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export {registerUser,loginuser,Busfacultylogin}
