import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const Message = models.Message || model("Message",MessageSchema);