import { Schema } from "mongoose";
new Schema({
    message: {
        type: String,
        require: true
    },
    from: {
        type: Schema.Types.ObjectId,
        require: true
    },
    to: {
        type: Schema.Types.ObjectId,
        require: true
    },
})