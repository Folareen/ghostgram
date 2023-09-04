"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


export default () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/messages')
                setMessages(res.data.messages)
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.response?.data?.error || error?.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return <div>
        {
            loading ?
                <p>
                    loading...
                </p>
                :
                <div>
                    <p>
                        Messsages
                    </p>
                    <div>
                        {
                            messages.map(({ message }) => (
                                <p>
                                    {message}
                                </p>
                            ))
                        }
                    </div>
                </div>
        }


    </div>
}