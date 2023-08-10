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
            return NextResponse.json({ message: 'Username is required' }, {status: 400})
        }
        if (!password) {
            return NextResponse.json({ message: 'Password is required' }, {status: 400})
        }

        const usernameTaken = await User.findOne({username})
        if(usernameTaken){
            return NextResponse.json({message: 'Username is taken'}, {status : 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ username, password: hashedPassword })

        const token = jwt.sign({ username }, process.env.JWT_SECRET!)

        const response = NextResponse.json({ username }, { status: 201 })
        response.cookies.set('token', token)

        return response

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Something went wrong' }, {status: 500})
    }
}