import { ApiError } from "../utils/ApiError.js";
import { Ticket } from "../model/Ticket.model.js";

const Ticketuser=async(req,res)=>{
    const {From,To,Class,Date,Gender}=req.body;
    try {
        if(!From){
            throw new ApiError(401,"from is required")
        }
        if(!To){
            throw new ApiError(401,"To is required ")
        }
        if(!Class){
            throw new ApiError(401,"To is required ")
        }
        if(!Date){
            throw new ApiError(401,"To is required ")
        }
        if(!Gender){
            throw new ApiError(401,"Gender is required")
        }

        const Ticketlogin=await Ticket.create({
            From:From,
            To:To,
            Class:Class,
            Date:Date,
            Gender:Gender
        })
        if(!Ticketlogin){
            throw new ApiError(401,"Server Error while saving the ticket data ")
        }
        const allTicketDetails = await Ticket.find();
        console.log("-----all ticketsdetails",allTicketDetails);
        const cookiedata=JSON.stringify({allTicketDetails});
        return res
        .cookie('allTicketDetails', cookiedata)
        .redirect("/Busschedule.html")
    } catch (error) {
        console.error("Error:", error);
        
        
    }
}
export {Ticketuser}