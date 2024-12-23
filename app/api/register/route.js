import { NextResponse } from "next/server";
import sequelize from "@/app/lib/database";
import User from "@/models/user";
export  async function GET(req) {
    const url = new URL(req.url);
    console.log(url);
    return NextResponse.json({message:`register api ${url}`})
}