import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { register , login , logout, getMyProfile , getAllAuthors , updateMyProfile, deleteMyProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', register );
router.post('/login', login )
router.get('/logout', isAuthenticated , logout )
router.get('/profile', isAuthenticated , getMyProfile )
router.get('/authors', getAllAuthors )
router.put('/update/:id', isAuthenticated ,  updateMyProfile )
router.delete('/delete/:id', isAuthenticated , deleteMyProfile)

export default router;