import { Router } from "express";
import { registerUser } from "../Controller/user.controller.js";
import { loginuser } from "../Controller/user.controller.js";
import { Busfacultylogin } from "../Controller/user.controller.js";
import { Ticketuser } from "../Controller/Ticket.controller.js";
import { Userdetail } from "../Controller/manager.controller.js";
const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginuser)
router.route("/BusFaculty").post(Busfacultylogin)
router.route("/Ticket").post(Ticketuser)
router.route("/Userdetail").get(Userdetail)

export default router;