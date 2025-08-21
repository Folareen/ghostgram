import connectToDB from "@/app/utils/connectToDB";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import Message from "../models/Message";

connectToDB()

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies?.get('token') || '';
        if (token) {
            const data: any = jwt.decode(token.value)

            const messages = await Message.find({ receiver: data.username }).sort({ createdAt: -1 })

            return NextResponse.json({
                messages
            })
        } else {
            return NextResponse.json({ messages: null, message: 'unathorized' }, { status: 401 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}