"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

export default () => {
    const { username } = useParams()
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setSending(true)
            await axios.post('/api/send-message', { receiver: username, content: message })
            router.push('/signup')
            toast.success('message sent, its now your turn')
        } catch (error: any) {
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