import { Router, Request, Response } from "express";
import validateToken from "../middlewares/ValidateToken"

const router: Router = Router();

router.use(validateToken)

router.get("/", (req: Request, res: Response) => {
    res.json(res.locals.user)
})

export default router;