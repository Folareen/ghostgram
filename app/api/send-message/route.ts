import connectToDB from "@/app/utils/connectToDB"
import { NextRequest, NextResponse } from "next/server"
import Message from "../models/Message"
import User from "../models/User"
import {v2} from 'cloudinary'
import formidable from 'formidable'

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


connectToDB()

export const config = {
  api: {
    bodyParser: false,
  },
};


export const POST = async (req: NextRequest) => {
    try {
         const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    // Check if a file is present in the request
    if (files.file) {
      const filePath = files.file.path;
        const response = await v2.uploader.upload(filePath)
  }

        const { receiver, content }: { receiver: string, content: string } = await req.json()
        if (!receiver || !content) {
            return NextResponse.json({
                message: 'Receiver and content is required'
            }, { status: 400 })
        }
        const usernameExists = await User.findOne({username: receiver})
        if (!usernameExists) {
            return NextResponse.json({ message: 'Receiver does not exist' }, { status: 400 })
        }

        const message = await Message.create({ receiver, content })

        return NextResponse.json({
            message: 'Message sent'
        }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

