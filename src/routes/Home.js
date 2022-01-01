import Nweet from "components/Nweet";
import { addDocument, onDBSnapshot, uploadAttachment } from "fbase";
import React, { useEffect, useState } from "react";

const DB_NWEETS = "nweets";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        onDBSnapshot(DB_NWEETS, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        const newNweet = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl: "",
        };

        setNweet("");

        if (attachment !== "") {
            const attachmentUrl = await uploadAttachment(
                userObj.uid,
                attachment,
            );

            newNweet.attachmentUrl = attachmentUrl;

            setAttachment("");
        }

        await addDocument(DB_NWEETS, newNweet);
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

        setNweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const {
                currentTarget: { result },
            } = event;

            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Twe" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
