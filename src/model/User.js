import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    message: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

export const User = models.User || model("User",UserSchema);