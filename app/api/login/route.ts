import User from "@/app/api/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectToDB from "../../utils/connectToDB";

connectToDB()

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const reqBody = await req.json()
        const { username, password } = reqBody

        if (!username) {
            return NextResponse.json({ message: 'Username is required' }, {status : 400})
        }
        if (!password) {
            return NextResponse.json({ message: 'Password is required' }, {status: 400})
        }

        const user = await User.findOne({ username }).select('+password')

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (!passwordCorrect) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET!)

        const response = NextResponse.json({ username }, { status: 200 })
        response.cookies.set('token', token)

        return response

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Something went wrong' }, {status: 500})
    }
}