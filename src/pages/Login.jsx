import React, {useState} from "react"
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import {
    useLoaderData,
    useNavigation,
    useNavigate,
    Form,
    NavLink
} from "react-router-dom"
import { auth } from "../services/firebase"
import FullScreenSection from "../components/FullScreenSection";


export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}



export default function Login() {
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    return (
        <FullScreenSection
            isDarkBackground
            justifyContent="center"
            alignItems="start"
            maxWidth="100%"
            position="relative"
            spacing={4}
            p={8}
        >
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}

            <Form
                method="post"
                className="login-form"
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                    onClick={onLogin}
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
            <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/register">
                                Sign up
                            </NavLink>
                        </p>
        </FullScreenSection>
    )
}
