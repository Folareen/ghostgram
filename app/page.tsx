"use client"

import Wrapper from "@/components/layouts/Wrapper"
import Link from "next/link"

export default function Home() {
  return (
    <Wrapper>
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-12 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center float shadow-2xl">
              <span className="text-5xl">👻</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-8">
            <span className="gradient-text">Ghost</span>
            <span className="text-white">Gram</span>
          </h1>

          <div className="text-xl md:text-2xl text-ghost-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            <p>
              Send anonymous messages to anyone, anywhere.
            </p>
            <span className="text-ghost-accent font-semibold"> Stay mysterious, stay connected.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 btn-ghost ghost-glow transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 glass text-ghost-text font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 border border-ghost-border hover:border-ghost-accent/30 hover:scale-105"
            >
              🔑 Sign In
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
              <div className="text-2xl font-bold text-ghost-accent mb-3">👻</div>
              <div className="text-sm text-ghost-text-secondary font-medium">Anonymous Messaging</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
              <div className="text-2xl font-bold text-ghost-purple mb-3">🔗</div>
              <div className="text-sm text-ghost-text-secondary font-medium">Profile Sharing</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center hover:border-ghost-accent/30 transition-all duration-300 border border-transparent">
              <div className="text-2xl font-bold text-ghost-pink mb-3">💬</div>
              <div className="text-sm text-ghost-text-secondary font-medium">Simple Interface</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">GhostGram</span>?
            </h2>
            <p className="text-xl text-ghost-text-secondary max-w-3xl mx-auto leading-relaxed">
              Experience the power of anonymous messaging with a simple, secure platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-8 card-ghost hover:border-ghost-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Complete Anonymity</h3>
              <p className="text-ghost-text-secondary text-base leading-relaxed">
                Your identity stays hidden. Send messages without revealing who you are.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 card-ghost hover:border-ghost-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Simple Messaging</h3>
              <p className="text-ghost-text-secondary text-base leading-relaxed">
                Easy-to-use interface for sending and receiving anonymous messages.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 card-ghost hover:border-ghost-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Profile Sharing</h3>
              <p className="text-ghost-text-secondary text-base leading-relaxed">
                Share your profile link to receive anonymous messages from others.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">
              Join the Anonymous Community
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass rounded-3xl p-8 text-center">
                <div className="text-3xl font-bold text-ghost-accent mb-2">1000+</div>
                <div className="text-ghost-text-secondary">Active Users</div>
              </div>
              <div className="glass rounded-3xl p-8 text-center">
                <div className="text-3xl font-bold text-ghost-purple mb-2">50K+</div>
                <div className="text-ghost-text-secondary">Messages Sent</div>
              </div>
              <div className="glass rounded-3xl p-8 text-center">
                <div className="text-3xl font-bold text-ghost-pink mb-2">99%</div>
                <div className="text-ghost-text-secondary">Privacy Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper >
  )
}
