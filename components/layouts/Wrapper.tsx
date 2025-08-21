import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Wrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${className} flex flex-col min-h-screen`}>
            <Header />
            <main className="flex-1 pt-24 pb-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Wrapper