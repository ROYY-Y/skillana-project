import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req : Request){ // Create Account
    try{
        await dbConnect();
        const {firstName, lastName, email, password} = await req.json();

        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({message : "Missing information!"}, {status : 400})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                { message: "Email have already existed!" },
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
      { message: "Internal server error" },
      { status: 500 }
    );
    }
}

export async function GET(req : Request, {params} : {params : {id: string}}){// Get User Information
    try {
        await dbConnect();

        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id : string};
        
        if (payload.id !== params.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
       const user = await User.findById(params.id);

       if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
       }
       return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // 1. Security check (same as your GET route)
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string };

    if (decoded.id !== params.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Get the new data from the request body
    const body = await req.json();

    // 3. Update the document in MongoDB
    // { new: true } returns the updated document
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}