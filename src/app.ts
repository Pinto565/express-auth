import express, { Application, Response, Request } from "express"
import config from "./config"
import mongoose from "mongoose"
import AuthRouter from "./routes/Auth"
import Profile from "./routes/Profile"

const app: Application = express()

const PORT: number = config.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Express Auth API"
    })
})

app.use("/auth", AuthRouter)
app.use("/profile", Profile)

mongoose.connect(config.mongoUrl).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log({ error: err })
})
app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`)
})