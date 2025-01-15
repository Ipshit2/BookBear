import {Router} from 'express'
import{createUser, loginUser, logoutUser, addBooks, getUser, updateStatus} from "../controllers/userController.js"
import {verifyToken} from "../middleware/auth.js"

const router = Router()

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/profile").get(verifyToken, getUser)
router.route("/addbooks").put(verifyToken, addBooks)
router.route("/updatestatus/:id").put(verifyToken,updateStatus)

export default router