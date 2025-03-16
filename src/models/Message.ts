import { model, models, Schema } from "mongoose";
const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default models.Message || model('Message', messageSchema);