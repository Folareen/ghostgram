"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"

const Page = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [profileError, setProfileError] = useState('')
    const [messagesError, setMessagesError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/profile')
                setUsername(res.data.username)
                setProfileError('')
            } catch (error: any) {
                setProfileError('Failed to load profile. Please refresh the page.')
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/messages')
                setMessages(res.data.messages)
                setMessagesError('')
            } catch (error: any) {
                setMessagesError('Failed to load messages. Please try again later.')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

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

    const retryProfileLoad = async () => {
        setProfileError('')
        try {
            const res = await axios.get('/api/profile')
            setUsername(res.data.username)
            setProfileError('')
        } catch (error: any) {
            setProfileError('Failed to load profile. Please refresh the page.')
        }
    }

    const retryMessagesLoad = async () => {
        setMessagesError('')
        setLoading(true)
        try {
            const res = await axios.get('/api/messages')
            setMessages(res.data.messages)
            setMessagesError('')
        } catch (error: any) {
            setMessagesError('Failed to load messages. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-ghost-text-secondary">Loading your messages...</p>
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
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="text-left mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-ghost-text-secondary hover:text-white transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-white/5 hover:scale-105"
                    >
                        <span className="text-lg">←</span>
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold font-heading text-white mb-3">Your Messages</h1>
                    <p className="font-text text-lg text-ghost-text-secondary">Check your anonymous message inbox</p>
                </div>

                <div className="glass rounded-3xl p-8 mb-10 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
                    <h2 className="text-2xl font-bold font-heading text-white mb-5">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={copyProfileLink}
                            className="font-button px-6 py-3 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                        >
                            📋 Copy Profile Link
                        </button>
                        <Link
                            href="/profile"
                            className="font-button px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-ghost-border hover:border-ghost-accent text-sm"
                        >
                            👤 View Profile
                        </Link>
                    </div>
                </div>

                <div className="glass rounded-3xl p-10 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Anonymous Messages ({messages.length})
                        </h2>
                        <div className="text-ghost-text-secondary text-lg bg-white/5 px-4 py-2 rounded-xl">
                            {messages.length === 0 ? 'No messages yet' : `${messages.length} message${messages.length === 1 ? '' : 's'}`}
                        </div>
                    </div>

                    {messagesError ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-white mb-4">Failed to Load Messages</h3>
                            <p className="font-text text-lg text-ghost-text-secondary mb-6 leading-relaxed max-w-2xl mx-auto">{messagesError}</p>
                            <button
                                onClick={retryMessagesLoad}
                                className="font-button px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-base"
                            >
                                🔄 Retry Loading
                            </button>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-ghost-border to-ghost-hover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-4xl">👻</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4">No Messages Yet</h3>
                            <p className="text-xl text-ghost-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
                                Share your profile link with others so they can send you anonymous messages!
                            </p>
                            <button
                                onClick={copyProfileLink}
                                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 mb-6 shadow-lg hover:shadow-xl text-lg"
                            >
                                📋 Copy Profile Link
                            </button>
                            <div className="bg-white/5 rounded-2xl p-4 max-w-lg mx-auto border border-ghost-border/30">
                                <p className="text-sm text-ghost-text-secondary mb-2 font-medium">Your Profile:</p>
                                <p className="text-ghost-accent font-mono text-base break-all">
                                    {window.location.origin}/{username}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map(({ content, attachment, createdAt }, index) => (
                                <div key={index} className="glass rounded-2xl p-6 border border-ghost-border/50 hover:border-ghost-accent/30 transition-all duration-300 hover:bg-white/5">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                <span className="text-lg">👻</span>
                                            </div>
                                            <div className="text-base font-medium text-ghost-text">
                                                {new Date(createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} • {new Date(createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </div>
                                        </div>
                                        <div className="text-sm text-ghost-text-secondary bg-white/5 px-3 py-2 rounded-xl">
                                            {new Date(createdAt).getFullYear()}
                                        </div>
                                    </div>

                                    <div className="ml-14">
                                        <p className="text-ghost-text leading-relaxed mb-4 text-lg">
                                            {content}
                                        </p>
                                        {attachment && (
                                            <Link
                                                href={attachment}
                                                target="_blank"
                                                className="inline-flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/40 hover:to-purple-600/40 text-ghost-accent hover:text-white rounded-xl transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transform"
                                            >
                                                <span>📎</span>
                                                <span>View Attachment</span>
                                                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {messages.length > 0 && (
                    <div className="glass rounded-3xl p-10 mt-12 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Message Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-ghost-accent mb-3">{messages.length}</div>
                                <div className="text-ghost-text-secondary text-lg">Total Messages</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-ghost-purple mb-3">👻</div>
                                <div className="text-ghost-text-secondary text-lg">Anonymous Senders</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-ghost-pink mb-3">⚡</div>
                                <div className="text-ghost-text-secondary text-lg">Real-time Updates</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page