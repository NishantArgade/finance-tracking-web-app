import { dbConnect } from "@/lib/db";
import Wallet from "@/models/wallet";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const wallets = await Wallet.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ data: wallets }, { status: 200 });
}
export async function POST(request) {
  const { name, type, amount, color } = await request.json();

  await dbConnect();
  await Wallet.create({
    name,
    type,
    amount,
    color,
  });

  return NextResponse.json({ message: "Post Hello, World!" }, { status: 201 });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await dbConnect();

  await Wallet.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted all wallets" }, { status: 200 });
}
