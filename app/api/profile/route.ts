import connectToDB from "@/app/utils/connectToDB";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectToDB()

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies?.get('token') || '';
        if (token) {
            const data: any = jwt.decode(token.value)

            return NextResponse.json({
                username: data.username
            })
        } else {
            return NextResponse.json({ username: null }, { status: 401 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}