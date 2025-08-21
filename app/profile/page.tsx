"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Page = () => {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [profileError, setProfileError] = useState('')
    const [messagesError, setMessagesError] = useState('')
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/profile')
                setUsername(res.data.username)
                setProfileError('')
            } catch (error: any) {
                setProfileError('Failed to load profile. Please refresh the page.')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/messages')
                setMessages(res.data.messages || [])
                setMessagesError('')
            } catch (error: any) {
                setMessagesError('Failed to load messages. Please try again later.')
            }
        })()
    }, [])

    const retryProfileLoad = async () => {
        setProfileError('')
        setLoading(true)
        try {
            const res = await axios.get('/api/profile')
            setUsername(res.data.username)
            setProfileError('')
        } catch (error: any) {
            setProfileError('Failed to load profile. Please refresh the page.')
        } finally {
            setLoading(false)
        }
    }

    const retryMessagesLoad = async () => {
        setMessagesError('')
        try {
            const res = await axios.get('/api/messages')
            setMessages(res.data.messages || [])
            setMessagesError('')
        } catch (error: any) {
            setMessagesError('Failed to load messages. Please try again later.')
        }
    }

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout')
            toast.success('Logged out')
            router.push('/login')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message)
        }
    }

    const copyProfileLink = async () => {
        const profileUrl = `${window.location.origin}/${username}`
        try {
            await navigator.clipboard.writeText(profileUrl)
            toast.success('Profile link copied to clipboard!')
        } catch (err) {
            const textArea = document.createElement('textarea')
            textArea.value = profileUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            toast.success('Profile link copied to clipboard!')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-ghost-text-secondary">Loading your profile...</p>
                </div>
            </div>
        )
    }

    if (profileError) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-white mb-4">Profile Loading Error</h1>
                    <p className="font-text text-lg text-ghost-text-secondary mb-6">{profileError}</p>
                    <button
                        onClick={retryProfileLoad}
                        className="font-button px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
                    >
                        🔄 Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-ghost-text-secondary hover:text-white transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-white/5 hover:scale-105"
                    >
                        <span className="text-lg">←</span>
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 bg-white/5 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-300 border border-ghost-border hover:border-red-500 flex items-center gap-2 hover:scale-105"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold font-heading text-white mb-3">Your Profile</h1>
                    <p className="font-text text-lg text-ghost-text-secondary">Manage your anonymous identity</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="glass rounded-3xl p-8 hover:border-ghost-accent/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold font-heading text-white mb-5">Profile Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <span className="font-text text-ghost-text-secondary text-sm">Username:</span>
                                <span className="font-text font-semibold text-white text-sm">{username}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <span className="font-text text-ghost-text-secondary text-sm">Profile Status:</span>
                                <span className="font-text font-semibold text-green-400 text-sm">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-3xl p-8 hover:border-ghost-accent/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold font-heading text-white mb-5">Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={copyProfileLink}
                                className="font-button w-full py-3 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                            >
                                📋 Copy Profile Link
                            </button>
                            <Link
                                href="/messages"
                                className="font-button block w-full py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-ghost-border hover:border-ghost-accent text-center text-sm"
                            >
                                💬 View Messages
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-3xl p-8 hover:border-ghost-accent/30 transition-all duration-300">
                    <h2 className="text-2xl font-bold font-heading text-white mb-6">Recent Messages Received</h2>
                    {messagesError ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <h3 className="text-lg font-semibold font-heading text-white mb-3">Failed to Load Messages</h3>
                            <p className="font-text text-ghost-text-secondary mb-4 text-sm">{messagesError}</p>
                            <button
                                onClick={retryMessagesLoad}
                                className="font-button px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
                            >
                                🔄 Retry
                            </button>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-ghost-border to-ghost-hover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-4xl">📭</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">No Messages Yet</h3>
                            <p className="text-ghost-text-secondary mb-6 leading-relaxed max-w-2xl mx-auto">
                                You haven't received any anonymous messages yet. Share your profile link to start receiving messages!
                            </p>
                            <button
                                onClick={copyProfileLink}
                                className="px-6 py-3 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                📋 Copy Profile Link
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.slice(0, 5).map((message: any, index: number) => (
                                <div key={index} className="glass rounded-2xl p-5 border border-ghost-border/50 hover:border-ghost-accent/30 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-ghost-accent to-ghost-purple rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm">👻</span>
                                            </div>
                                            <div className="text-sm font-medium text-ghost-text">
                                                {new Date(message.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} • {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </div>
                                        </div>
                                        <div className="text-xs text-ghost-text-secondary bg-white/5 px-2 py-1 rounded-lg">
                                            {new Date(message.createdAt).getFullYear()}
                                        </div>
                                    </div>

                                    <div className="ml-11">
                                        <p className="text-ghost-text leading-relaxed mb-3">
                                            {message.content}
                                        </p>
                                        {message.attachment && (
                                            <a
                                                href={message.attachment}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-ghost-accent/20 to-ghost-purple/20 hover:from-ghost-accent/40 hover:to-ghost-purple/40 text-ghost-accent hover:text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 transform"
                                            >
                                                <span>📎</span>
                                                <span>View Attachment</span>
                                                <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="glass rounded-3xl p-8 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent mt-8">
                    <h2 className="text-2xl font-bold font-heading text-white mb-6">Coming Soon</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="text-center p-5 bg-white/5 rounded-2xl">
                            <div className="text-2xl mb-2">📊</div>
                            <h3 className="font-text font-semibold text-white mb-2 text-sm">Message Analytics</h3>
                            <p className="font-text text-xs text-ghost-text-secondary">Track your message patterns</p>
                        </div>
                        <div className="text-center p-5 bg-white/5 rounded-2xl">
                            <div className="text-2xl mb-2">🎨</div>
                            <h3 className="font-text font-semibold text-white mb-2 text-sm">Custom Themes</h3>
                            <p className="font-text text-xs text-ghost-text-secondary">Personalize your profile</p>
                        </div>
                        <div className="text-center p-5 bg-white/5 rounded-2xl">
                            <div className="text-2xl mb-2">🔒</div>
                            <h3 className="font-text font-semibold text-white mb-2 text-sm">Privacy Controls</h3>
                            <p className="font-text text-xs text-ghost-text-secondary">Advanced security options</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page