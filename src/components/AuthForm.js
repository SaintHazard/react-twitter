import { createEmail, signInEmail } from "fbase";
import react, { useState } from "react";

const AuthForm = () => {
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

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    onChange={onChange}
                    name="email"
                    value={email}
                    type="text"
                    placeholder="Email"
                    required
                    className="authInput"
                />
                <input
                    onChange={onChange}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    className="authInput"
                    required
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "SignIn"}
                    className="authInput authSubmit"
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "SignIn" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;
