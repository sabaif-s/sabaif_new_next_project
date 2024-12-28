import { NextResponse } from "next/server";
import User from '@/models/user';
export async function GET(req, { params }) {
  const { email } = params; // Extract 'email' from params
  const user = await User.findOne({ where: { email } });
  if(user){
    return NextResponse.json({ message: `User with email ${email} found`, user },{status:200});
  }
  else{
    return NextResponse.json({ message: `User with email ${email} not found` },{status:404});
  }
   
}
