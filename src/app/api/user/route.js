import { User } from "@/model/User";
import { dbConnect } from "@/utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const current = await currentUser();
    const email = current?.emailAddresses[0].emailAddress;
    if (!email) throw new Error("Field is empty");

    const findUser = await User.findOne({ user: email });
    if (findUser) throw new Error("User already registered");

    await User.create({ user: email });

    return NextResponse.json({ data: "User Created" });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong" });
  }
}

export async function GET(request) {
  try {
    const current = await currentUser();
    const email = current?.emailAddresses[0].emailAddress;
    const findUser = await User.findOne({ user: email });

    return NextResponse.json(findUser);
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong" });
  }
}
