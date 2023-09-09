"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

const Page = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const router = useRouter()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await axios.post('/api/login', { username, password })
            router.push('/profile')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type='text' value={username} onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <input type='password' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <button type="submit">
                    {
                        submitting ? 'submitting...' : 'login'
                    }
                </button>
            </form>

        </div>
    )
}

export default Page