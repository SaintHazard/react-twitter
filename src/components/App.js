import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                });
            } else {
                setUserObj(null);
            }

            setInit(true);
        });

        return () => {
            console.log("useEffect return");
        };
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;

        if (user) {
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
            });
        } else {
            setUserObj(null);
        }
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
