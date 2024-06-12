import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest, res: NextResponse) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 500 });
  }
  return NextResponse.json(
    { message: "user found", data: user },
    { status: 200 }
  );
}
