import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full py-8 px-4'>
            <div className='max-w-6xl mx-auto'>
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-6 h-6 bg-gradient-to-br from-ghost-accent to-ghost-purple rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">👻</span>
                        </div>
                        <span className="text-lg font-bold font-logo bg-gradient-to-r from-ghost-accent to-ghost-purple bg-clip-text text-transparent">
                            GhostGram
                        </span>
                    </div>
                    <p className="font-text text-ghost-text-secondary mb-3 text-sm">
                        Share your anonymous profile and receive messages from anyone
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-xs">
                        <a href="#" className="font-text text-ghost-text-secondary hover:text-ghost-accent transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="font-text text-ghost-text-secondary hover:text-ghost-accent transition-colors duration-300">
                            Terms of Service
                        </a>
                        <a href="#" className="font-text text-ghost-text-secondary hover:text-ghost-accent transition-colors duration-300">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer