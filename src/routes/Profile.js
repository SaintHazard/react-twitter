import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onSignOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <>
            <button onClick={onSignOutClick}>SignOut</button>
        </>
    );
};

export default Profile;
