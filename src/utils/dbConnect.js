import { connect } from "mongoose";
import { NextResponse } from "next/server"


export const dbConnect = async () =>{
    try {
        await connect(process.env.URL ?? "",{
            dbName: "Stock"
        });
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({error: error.message});
        return NextResponse.json({error: "DB is not connected"});
    }
}
