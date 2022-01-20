import { Router, Request, Response } from "express";
import user from "../models/UserModel";
import { hash, compare } from "bcryptjs"
import signToken from "../functions/SignJWT";
import sendMail from "../functions/SendMail";
import verifyToken from "../functions/VerifyToken";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;
    if (email && username && password) {
        let User = await user.findOne({ email });
        if (User) {
            res.json({
                message: "User already exists"
            });
        } else {
            hash(password, 10, (err: Error, hash: String) => {
                if (err) res.json({ error: err })
                else {
                    user.create({ email, username, password: hash }).then((user: any) => {
                        const payload = { username, email }
                        let verificationToken = signToken(payload)
                        sendMail(email, verificationToken)
                        res.json({
                            message: "A Verification Email has been sent to your email address",
                            user: user.email
                        })
                    }).catch((err: Error) => {
                        res.json({ error: err })
                    })
                }
            })
        }
    }
    else {
        res.json({
            message: "Please provide email, username and password"
        })
    }
})

router.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (email && password) {
        const User = await user.findOne({ email });
        if (User) {
            compare(password, User.password, (err: Error, isMatch: boolean) => {
                if (isMatch) {
                    let payload = { id: User.id, email: User.email, username: User.username, verified: User.verified }
                    const accessToken = signToken(payload);
                    res.json({
                        message: "User Logged In",
                        accessToken
                    })
                } else {
                    res.json({
                        message: "Incorrect Combination"
                    })
                }
            })
        }
        else {
            res.json({
                message: "User does not exist"
            })
        }
    } else {
        res.json({
            message: "Please provide email and password"
        })
    }
})

router.get("/verify/:token", async (req: Request, res: Response): Promise<void> => {
    let verificationToken = req.params.token;
    let userDetails = verifyToken(verificationToken)
    if (userDetails) {
        let User = await user.findOne({ email: userDetails.email });
        User.verified = true;
        await User.save()
        res.json({
            message: "User Verified",
        })
    } else {
        res.json({
            message: "Invalid Link"
        })
    }
})

export default router;