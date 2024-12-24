import { NextResponse } from "next/server";
import sequelize from "@/app/lib/database";
import User from "@/models/user";
export  async function GET(req) {
    const url = new URL(req.url);
    console.log(url);
    return NextResponse.json({message:`register api ${url}`})
}

export async function POST(req){
    const body= await req.json();
    const {email,username}=body;
    if(!email || !username){
        return NextResponse.json({message:"please provide all fields", ok:"false"},{status:400})
    }
    try {
        const findUser=await User.findOne({where: {email}});
        
          if(findUser){
            return NextResponse.json({error:"user already registered",ok:"false"},{status:401})
          }
        
        const newUser= await User.create({email,username});
        return NextResponse.json(newUser);
    } catch (error) {
         if(error.name == "SequelizeValidationError"){
             
            const objectArray = error.errors || [];
            const findEmailError=objectArray.find((item)=> item.validatorKey == "isEmail");
            const findLengthError=objectArray.find((item)=> item.validatorKey == "len");
            if(findEmailError){
              console.log("email error");
              return NextResponse.json({message:"invalid email credentials"});
            }
            if(findLengthError){
              return NextResponse.json({message:"username should be between 3-30 characters"});
            }
         }
          
           
        //   console.log(newError.errors);
        console.log(error);
        return NextResponse.json({message:"internal server error"});
        
    }
     
     
}