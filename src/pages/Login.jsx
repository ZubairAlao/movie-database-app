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
import { Text, Button, Input, Center, useColorMode } from '@chakra-ui/react';


export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}



export default function Login() {
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode();

    const onLogin = (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoading(true);

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

            if (errorCode === 'auth/invalid-email') {
                setLoginError('Invalid Email');
            } else if (errorCode === 'auth/missing-password') {
                setLoginError("Missing Password");
            } else if (errorCode === 'auth/wrong-password') {
                setLoginError("Wrong Password");
            } else if (errorCode === "auth/invalid-login-credentials") {
                setLoginError("Invalid Login credentials");
            } else if (errorCode === "auth/too-many-requests") {
                setLoginError("Access to this account has been temporarily disabled due to many failed login attempts. Try again later");
            } else {
                setLoginError("An error occurred. Please try again.")
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <FullScreenSection
            isDarkBackground
            justifyContent="center"
            alignItems="center"
            maxWidth="100%"
            position="relative"
            spacing={4}
            p={8}
        >
            <Text fontSize="1.5rem">Login to your account</Text>
            {message && <Text color="red">{message}</Text>}
            {loginError && <Text color="red">{loginError}</Text>}

            <Form
                method="post"
                replace
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    mb={4}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    mb={4}
                />
                <Center>
                    <Button
                        onClick={onLogin}
                        isLoading={isLoading}
                        bg={colorMode === "light" ? "#1E1E1E" : "#FFFFFF"}
                        color={colorMode === "light" ? "#FFFFFF" : "#1E1E1E"}
                        mb={4}
                        _hover={{
                            bg: colorMode === "light" ? "#2E2E2E" : "#DDDDDD", // Change the background color on hover
                            color: colorMode === "light" ? "#FFFFFF" : "#1E1E1E", // Change the text color on hover
                          }}
                    >
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                </Center>
            </Form>
            
            <Text textAlign="center">
                No account yet? {' '}
                <NavLink style={{ textDecoration: 'underline' }} to="/register">
                    Sign up
                </NavLink>
            </Text>
            
        </FullScreenSection>
    )
}
