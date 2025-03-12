import { Message, MessageView } from "./message";
import { User } from "../user/user";

export function mapMessageResponseToMessageView(messages:Message[], client:User):MessageView[] {
    const messageView:MessageView[] = messages.map((message) => ({
        type: message.from.username === client.username ? "sended" : "received",
        message: message.message,
        from: message.from.username
    }))
    return messageView
}
