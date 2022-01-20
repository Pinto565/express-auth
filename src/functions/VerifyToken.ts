import { verify, Secret } from "jsonwebtoken";
import config from "../config"

let jwtSecret: Secret = config.jwtSecret

const verifyToken = (token: string): any => {
    let user = ""
    verify(token, jwtSecret, (err, decoded: any) => {
        if (err) {
        } else {
            user = decoded.payload
        }
    })
    return user
}

export default verifyToken;