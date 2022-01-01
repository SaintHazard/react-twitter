import {
    signInEmail,
    createEmail,
    googleProvider,
    githubProvider,
    signPopup,
} from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await createEmail(email, password);
            } else {
                await signInEmail(email, password);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;

        let provider;

        if (name === "google") {
            provider = googleProvider;
        } else if (name === "github") {
            provider = githubProvider;
        }

        try {
            const data = await signPopup(provider);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    name="email"
                    value={email}
                    type="text"
                    placeholder="Email"
                    required
                />
                <input
                    onChange={onChange}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    required
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "SignIn"}
                />
                <p>{error}</p>
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "SignIn" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
