import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setUserObj(user);

            setInit(true);
        });

        return () => {
            console.log("useEffect return");
        };
    }, []);

    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializing..."
            )}
            <footer>&copy; {new Date().getFullYear()} React-Twitter</footer>
        </>
    );
}

export default App;
