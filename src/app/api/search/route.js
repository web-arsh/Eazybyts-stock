import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const search = await request.json();
    if (!search['search']) throw new Error("Don't provide any value");

    const options = {
      method: 'GET',
      url: 'https://stock.indianapi.in/stock',
      params: { name: search["search"] },
      headers: { 'X-Api-Key': process.env.STOCK_KEY }
    };

    const stock = await axios.request(options);
    const name = stock.data["companyProfile"]['exchangeCodeNse'];
    const price = stock.data['currentPrice']['NSE'];

    return NextResponse.json({ name, price });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong" });
  }
}
