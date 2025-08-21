import SendMessage from "@/components/SendMessage";
import axios from "axios"
import Link from "next/link"

async function usernameExists(username: string) {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/username-exists`, { username });
        if (response.status === 200) return true;
    } catch (err: any) {
        console.error('Error checking username:', err.message);
        return false;
    }
    return false;
}

export default async function Page({ params }: { params: any }) {
    const exists = await usernameExists(params.username);

    if (!exists) {
        return (
            <div className="min-h-screen py-20 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-8 float">
                        <span className="text-5xl">👻</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        User <span className="gradient-text">Not Found</span>
                    </h1>

                    <p className="text-xl text-ghost-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
                        The user <span className="text-ghost-accent font-semibold">@{params.username}</span> doesn&apos;t exist on GhostGram.
                        They might have a different username or haven&apos;t joined yet.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 btn-ghost ghost-glow"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/signup"
                            className="px-8 py-4 glass text-ghost-text font-semibold text-lg rounded-xl hover:bg-white/10 transition-all duration-300 border border-ghost-border"
                        >
                            Join GhostGram
                        </Link>
                    </div>

                    <div className="glass rounded-2xl p-6 max-w-lg mx-auto">
                        <h3 className="text-lg font-semibold text-white mb-4">💡 Need Help?</h3>
                        <div className="text-ghost-text-secondary space-y-2 text-sm">
                            <p>• Check if you typed the username correctly</p>
                            <p>• Ask the person for their exact GhostGram username</p>
                            <p>• They might need to create an account first</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <SendMessage />;
}