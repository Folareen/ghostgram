import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, password: {
        type: String,
        required: true,
        select: false
    }
})

const User = model('User', UserSchema)

export default User