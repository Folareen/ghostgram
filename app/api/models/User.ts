import { model, models, Schema } from "mongoose";

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

const User = models.User || model('User', UserSchema);

export default User