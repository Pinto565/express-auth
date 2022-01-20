import { Request, Response, NextFunction } from "express"
import { Secret, verify } from "jsonwebtoken"
import verifyToken from "../functions/VerifyToken"
import config from "../config"

let jwtSecret: Secret = config.jwtSecret

const validateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authToken = req.headers.authorization?.split(" ")[1]
    if (authToken) {
        let userDetails = verifyToken(authToken)
        if (userDetails) {
            res.locals.user = userDetails
            next()
        } else {
            res.
                status(401).
                json({
                    message: "Invalid Token"
                })
        }
    } else {
        res.
            status(403).
            json({
                message: "No token provided"
            })
    }
}

export default validateToken;