import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";



export async function GET(req : Request, { params }: { params: Promise<{ id: string }>} ){// Get User Information
    try {
        await dbConnect();
        const { id } = await params;
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id : string};
        
        if (payload.id !== id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
       const user = await User.findById(id);

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
 { params }: { params: Promise<{ id: string }>}
) {
  try {
    await dbConnect();
    const {id} = await params ;
    // 1. Security check (same as your GET route)
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string };

    if (String(decoded.id).trim() !== String(id).trim()) {
        console.log("ID Mismatch!", { decodedId: decoded.id, routeId: id });
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Get the new data from the request body
    const body = await req.json();

    // 3. Update the document in MongoDB
    // { new: true } returns the updated document
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error : any) {
    console.error("PUT Error:", error.message);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}