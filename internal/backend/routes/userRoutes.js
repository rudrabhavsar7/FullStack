import express, { Router } from "express";

import { createUser, loginUser } from "../controller/userController.js";

const router = Router();

router.post('/signup',createUser);
router.post('/login',loginUser);

export default router;