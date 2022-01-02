import React, { useEffect, useState } from "react";
import { authService, getDocuments, updateMyProfile } from "fbase";
import { useHistory } from "react-router-dom";

const DB_NWEETS = "nweets";

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onSignOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    };

    const getMyNweets = async () => {
        const nweets = await getDocuments(DB_NWEETS, userObj.uid);
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateMyProfile({
                displayName: newDisplayName,
            });

            refreshUser();
        }
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input type="submit" value="Update profile" />
            </form>
            <button onClick={onSignOutClick}>SignOut</button>
        </>
    );
};

export default Profile;
