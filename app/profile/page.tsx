"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const Page = () => {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/profile')
                setUsername(res.data.username)
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
                        {username}
                    </p>
                    <div>
                        {
                            // profile links
                        }
                    </div>
                </div>
        }


    </div>
}

export default Page