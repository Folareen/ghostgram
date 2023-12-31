"use client"

import Link from "next/link"


export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-50">
      <h1 className="text-blue-600 text-2xl font-sans-serif font-bold">
        Welcome to GhostGram!
      </h1>
      <Link href={'/login'}>
        Login
      </Link>
      <Link href={'/signup'}>
        Signup
      </Link>
    </main>
  )
}
