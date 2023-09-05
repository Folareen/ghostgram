import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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
        console.log(error.message)
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}