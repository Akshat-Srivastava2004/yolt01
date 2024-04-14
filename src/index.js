import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { Busfaculty } from "./model/BusFaculty.model.js";
import { app } from "./app.js";

import cookieParser from "cookie-parser";
dotenv.config({
    path: './public/.env'
});

//  const Busfacultydata = {
//     username: "Rahul",
//     Pin: "100"
//  };

//  Busfaculty.create(Busfacultydata)
//     .then(savedAdmin => {
//         console.log('Busfaculty data saved:', savedAdmin);
//     })
//     .catch(err => {
//         console.error('Error saving admin data:', err);
//     });


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 5000}`);
           
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
   