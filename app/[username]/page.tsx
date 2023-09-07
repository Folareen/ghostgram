import SendMessage from "@/components/SendMessage";
import axios from "axios"

async function usernameExists(username: string) {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/username-exists`, { username });
        if (response.status === 200) return true;
    } catch (err: any) {
        console.log(err.message, 'error');
    }
    return false;
}

export default async function Page({ params }: { params: any }) {
    const exists = await usernameExists(params.username);
    return (
        <div>
            {
                exists ? <SendMessage /> : 'user not found'
            }
        </div>
    );
}