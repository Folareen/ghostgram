import connectToDB from "@/app/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";

connectToDB()

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json()
        const username = reqBody.username
        if (username) {
            const usernameExists = await User.findOne({ username })
            if (usernameExists) {
                return NextResponse.json({
                    username,
                    status: true,
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    username,
                    status: false,
                }, { status: 404 })
            }
        } else {
            return NextResponse.json({ message: 'Invalid username' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}