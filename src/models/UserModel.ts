import mongoose, { Schema } from "mongoose"

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false }
}, {
    timestamps: true
})

const user = mongoose.model("User", userSchema)

export default user; 