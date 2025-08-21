"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"

const Page = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="text-left mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-ghost-text-secondary hover:text-white transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-white/5 hover:scale-105"
                    >
                        <span className="text-lg">←</span>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-ghost-accent to-ghost-purple rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl">👻</span>
                        </div>
                        <span className="text-2xl font-bold font-logo bg-gradient-to-r from-ghost-accent to-ghost-purple bg-clip-text text-transparent">
                            GhostGram
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold font-heading text-white mb-3">Welcome Back</h1>
                    <p className="font-text text-lg text-ghost-text-secondary">Sign in to your anonymous profile</p>
                </div>

                <div className="glass rounded-3xl p-10 neon-border hover:border-ghost-accent/40 transition-all duration-300">
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold font-heading text-ghost-text mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-ghost-border rounded-xl text-white placeholder-ghost-text-secondary focus:border-ghost-accent transition-all duration-300 input-ghost text-base font-text"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold font-heading text-ghost-text mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-ghost-border rounded-xl text-white placeholder-ghost-text-secondary focus:border-ghost-accent transition-all duration-300 input-ghost text-base font-text"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ghost-text-secondary hover:text-ghost-accent transition-colors duration-300 hover:scale-110"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="font-button w-full py-3 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {submitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="spinner w-4 h-4"></div>
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="my-8 flex items-center">
                        <div className="flex-1 border-t border-ghost-border"></div>
                        <span className="px-6 text-base text-ghost-text-secondary">or</span>
                        <div className="flex-1 border-t border-ghost-border"></div>
                    </div>

                    <div className="text-center">
                        <p className="text-ghost-text-secondary text-lg">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-ghost-accent hover:text-cyan-400 font-semibold transition-colors duration-300 hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page