import connectToDB from "@/app/utils/connectToDB"
import { NextRequest, NextResponse } from "next/server"
import Message from "../models/Message"
import User from "../models/User"

connectToDB()

export const POST = async (req: NextRequest) => {
  try {

    const { receiver, content, attachment }: { receiver: string, content: string, attachment: string } = await req.json()
    if (!receiver || !content) {
      return NextResponse.json({
        message: 'Receiver and content is required'
      }, { status: 400 })
    }
    const usernameExists = await User.findOne({ username: receiver })
    if (!usernameExists) {
      return NextResponse.json({ message: 'Receiver does not exist' }, { status: 400 })
    }

    const message = await Message.create({ receiver, content, attachment })

    return NextResponse.json({
      message: 'Message sent'
    }, { status: 200 })

  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

