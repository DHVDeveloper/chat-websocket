import {Schema, model, models} from 'mongoose'


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    online: {
        type: Boolean,
        required: false,
        default: true
    },
    chatRooms: [{ type: Schema.Types.ObjectId, ref: 'ChatRoom' }],
},{
    timestamps: true
})


export default models.User || model('User', userSchema)