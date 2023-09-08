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
    }, type: {
        type: String,
        enum : ['file','text'],
        default: 'text'
    }
}, {timestamps: true})

const Message = models.Message || model('Message', MessageSchema);

export default Message