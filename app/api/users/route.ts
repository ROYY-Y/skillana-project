import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req : Request){ // Craete Account
    try{
        await dbConnect();
        const {firstName, lastName, email, password} = await req.json();

        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({error : "Missing information!"}, {status : 400})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                { error: "Email have already existed!" },
                { status: 400 }
            );
        }

        const salt= await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword,
        });

        return NextResponse.json({
        message: "Create user successfully",
        user: {
            id : newUser._id,
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email
        }
        }, { status: 201 });



    }
    catch(error: any){
        console.log("Register Error : ", error)
        return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    }
}