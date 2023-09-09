import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    }, receiver: {
        type: String,
        ref: 'User',
        required: true,
    }, attachment: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const Message = models.Message || model('Message', MessageSchema);

export default Message