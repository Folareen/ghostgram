"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        let cancelled = false
            ; (async () => {
                try {
                    const res = await axios.get('/api/profile')
                    if (!cancelled) setIsLoggedIn(!!res.data?.username)
                } catch (error: any) {
                    if (!cancelled) {
                        setIsLoggedIn(false)
                    }
                }
            })()
        return () => { cancelled = true }
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout')
            setIsLoggedIn(false)
            setIsMobileMenuOpen(false)
            toast.success('Successfully logged out')
            router.push('/')
        } catch (error: any) {
            toast.error('Failed to logout. Please try again.')
            console.error('Logout error:', error)
        }
    }

    return (
        <header className='w-full top-0 right-0 left-0 fixed z-50 p-2 sm:p-4'>
            <div className='glass rounded-2xl px-3 sm:px-5 py-3 w-full mx-auto max-w-6xl flex justify-between items-center border border-ghost-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>
                <div className="flex items-center space-x-3 sm:space-x-6">
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-ghost-accent to-ghost-purple rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <span className="text-sm sm:text-lg">👻</span>
                        </div>
                        <span className="text-lg sm:text-xl font-bold font-logo bg-gradient-to-r from-ghost-accent to-ghost-purple bg-clip-text text-transparent">
                            GhostGram
                        </span>
                    </Link>
                </div>

                <nav className="hidden sm:flex items-center space-x-6">
                    {isLoggedIn && (
                        <>
                            <Link
                                href="/messages"
                                className="font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base"
                            >
                                Messages
                            </Link>
                            <Link
                                href="/profile"
                                className="font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="font-button px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="font-button px-5 py-2.5 bg-gradient-to-r from-ghost-accent to-ghost-purple hover:from-ghost-purple hover:to-ghost-accent text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </nav>

                <div className="sm:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-ghost-text hover:text-ghost-accent transition-colors duration-300 p-2"
                    >
                        {isMobileMenuOpen ? (
                            <span className="text-xl">✕</span>
                        ) : (
                            <span className="text-xl">☰</span>
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="sm:hidden absolute top-full left-2 right-2 mt-2 glass rounded-2xl border border-ghost-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
                    <div className="p-4 space-y-3">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/messages"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/5"
                                >
                                    Messages
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/5"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left font-button text-red-400 hover:text-red-300 transition-colors duration-300 font-medium text-base py-2 px-3 rounded-lg hover:bg-red-500/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/5"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block font-button text-ghost-text hover:text-ghost-accent transition-colors duration-300 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/5"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header