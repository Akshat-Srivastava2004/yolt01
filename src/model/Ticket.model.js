import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema({
    From:{
        type: String,
        required: true,
    },
    To:{
        type: String,
        required: true,
    },
    Class:{
        type: String,
        required: true,
    },
    Date:{
        type: String,
        required: true,
    },
    Gender:{
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Ticket = mongoose.model("Ticket", TicketSchema);
