import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req: NextRequest, res: NextResponse) => {
    try {
        if (req.method != 'POST') {
            return NextResponse.json({ message: 'Route not found' }, { status: 404 })
        }

        const reqBody = await req.json()
        const { username, password } = reqBody

        if (!username) {
            return NextResponse.json({ message: 'Username is required' })
        }
        if (!password) {
            return NextResponse.json({ message: 'Password is required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ username, password: hashedPassword })

        const token = jwt.sign({ username }, process.env.JWT_SECRET!)

        const response = NextResponse.json({ username }, { status: 201 })
        response.cookies.set('token', token)

        return response

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' })
    }
}