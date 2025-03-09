import { Schema, model, models } from 'mongoose';

const chatRoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true, 
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages:[{type: Schema.Types.ObjectId, ref: 'Message'}]
});

const ChatRoom = models.ChatRoom || model('ChatRoom', chatRoomSchema);
export default ChatRoom;