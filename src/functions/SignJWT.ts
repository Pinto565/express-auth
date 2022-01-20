import { sign, Secret } from "jsonwebtoken";
import config from "../config";

let jwtSecret: Secret = config.jwtSecret;

const signToken = (payload: Object): string => {
    return sign({ payload }, jwtSecret, { expiresIn: "1h" })
}

export default signToken;