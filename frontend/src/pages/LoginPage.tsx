import { useState } from "react"
import { useLogin } from "../hooks/auth/useLogin";

export const LoginPage = () => {
    const loginMutation = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            ログインページです
            <input
                type="email"
                className="border"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="border"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={() => loginMutation.mutate({ email, password })}
            >ログイン</button>
        </div >
    )
}