"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

const SendMessage = () => {
    const { username } = useParams()
    const [message, setMessage] = useState('')
    const [attachment, setAttachment] = useState<any>(null)
    const [sending, setSending] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setSending(true)
            let attachmentUrl = ''
            if (attachment) {
                const formData = new FormData()
                formData.append('file', attachment)
                formData.append('upload_preset', 'GhostGram');
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                attachmentUrl = response.data.secure_url
            }
            await axios.post('/api/send-message', { receiver: username, content: message, attachment: attachmentUrl })
            router.push('/signup')
            toast.success('message sent, its now your turn')
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setSending(false)
        }
    }

    return <div>
        <p>
            Send message to {username}
        </p>
        <form onSubmit={handleSubmit}>
            <input placeholder="enter message" onChange={(e) => {
                setMessage(e.target.value)
            }} value={message} />
            <input type='file' onChange={(e) => {
                setAttachment(e.currentTarget?.files && e.currentTarget?.files[0])
            }} />
            <button disabled={sending} type='submit'>
                {
                    sending ?
                        'Sending...'
                        :
                        'Send'
                }
            </button>
        </form>

    </div>
}

export default SendMessage