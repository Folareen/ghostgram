"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"

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
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="min-h-screen py-16 sm:py-20 px-3 sm:px-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="text-left mb-6 sm:mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-ghost-text-secondary hover:text-white transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-white/5 hover:scale-105"
                    >
                        <span className="text-base sm:text-lg">←</span>
                        <span className="font-medium text-sm sm:text-base">Back to Home</span>
                    </Link>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-ghost-accent to-ghost-purple rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl sm:text-3xl">👻</span>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold font-logo bg-gradient-to-r from-ghost-accent to-ghost-purple bg-clip-text text-transparent">
                            GhostGram
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">Send Anonymous Message</h1>
                    <p className="font-text text-base sm:text-lg text-ghost-text-secondary">Send a message to @{username}</p>
                </div>

                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 neon-border hover:border-ghost-accent/40 transition-all duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold font-heading text-ghost-text mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-ghost-border rounded-xl text-white placeholder-ghost-text-secondary focus:border-ghost-accent transition-all duration-300 input-ghost text-sm sm:text-base font-text resize-none"
                                placeholder="Type your anonymous message here..."
                                rows={5}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="attachment" className="block text-sm font-semibold font-heading text-ghost-text mb-2">
                                Attachment (Optional)
                            </label>
                            <input
                                id="attachment"
                                type="file"
                                onChange={(e) => {
                                    setAttachment(e.currentTarget?.files && e.currentTarget?.files[0])
                                }}
                                accept="image/*"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-ghost-border rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ghost-accent file:text-white hover:file:bg-ghost-purple transition-all duration-300 file:font-button"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="font-button w-full py-2.5 sm:py-3 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {sending ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="spinner w-4 h-4"></div>
                                    <span>Sending Message...</span>
                                </div>
                            ) : (
                                'Send Anonymous Message'
                            )}
                        </button>
                    </form>

                    {message && (
                        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
                            <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-3">Message Preview</h3>
                            <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                <p className="font-text text-sm sm:text-base text-ghost-text leading-relaxed">{message}</p>
                                {attachment && (
                                    <div className="mt-3 p-2 bg-ghost-accent/10 rounded-xl border border-ghost-accent/20">
                                        <p className="font-text text-xs text-ghost-accent font-medium">
                                            📎 Attachment: {attachment.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-ghost-accent/30 transition-all duration-300 border border-transparent mt-6 sm:mt-8">
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-3">Privacy Information</h3>
                        <div className="space-y-2">
                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <span className="text-ghost-accent text-sm sm:text-base">🔒</span>
                                <p className="font-text text-ghost-text-secondary text-xs sm:text-sm">
                                    Your message will be completely anonymous. The recipient won&apos;t know who sent it.
                                </p>
                            </div>
                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <span className="text-ghost-accent text-sm sm:text-base">👻</span>
                                <p className="font-text text-ghost-text-secondary text-xs sm:text-sm">
                                    No personal information is collected or stored with your message.
                                </p>
                            </div>
                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <span className="text-ghost-accent text-sm sm:text-base">💬</span>
                                <p className="font-text text-ghost-text-secondary text-xs sm:text-sm">
                                    You can send messages to anyone with a GhostGram profile.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMessage