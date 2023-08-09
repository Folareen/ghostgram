"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"

export default () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const router = useRouter()

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await axios.post('/api/signup', { username, password })
            router.push('/profile')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input type='text' value={username} onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <input type='password' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <button type="submit">
                    {
                        submitting ? 'submitting...' : 'signup'
                    }
                </button>
            </form>

        </div>
    )
}