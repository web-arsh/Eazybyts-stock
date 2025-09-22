import { Message } from "@/model/Message";
import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { name, message, pic } = await request.json();
    const current = await currentUser();
    const email = current?.emailAddresses[0].emailAddress;

    if (!name || !message || !pic || !email) throw new Error("Field is empty");

    const msg = await Message.create({ name, message, pic });

    global.io?.emit("newMessage", msg);

    await User.findOneAndUpdate(
      { user: email },
      { $push: { message: msg._id } },
      { new: true }
    );

    return NextResponse.json({ data: "Message Sent" });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong" });
  }
}

export async function GET(request) {
  try {
    const msg = await Message.find();
    return NextResponse.json(msg);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong" });
  }
}
