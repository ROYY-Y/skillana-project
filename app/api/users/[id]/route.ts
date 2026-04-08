import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req : Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        
        /*id ต้องเป็นฐาน16 มี24ตัวอักษร*/
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid ID format" }, 
                { status: 400 }
            );
        }

        const user = await User.findById(id).select("-password"); /*ไม่เอารหัสมา*/

        if (!user) {
            return NextResponse.json({ message: "User not found!" }, {status: 404});
        }

        return NextResponse.json(user, {status: 200});

    } catch (error: any) {
        console.log("Show user error : ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}