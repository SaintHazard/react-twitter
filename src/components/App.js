import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            console.log(user);
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
            });

            setInit(true);
        });

        return () => {
            console.log("useEffect return");
        };
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
        });
    };

    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                />
            ) : (
                "Initializing..."
            )}
            <footer>&copy; {new Date().getFullYear()} React-Twitter</footer>
        </>
    );
}

export default App;
