import react, { useState } from "react";
import { addDocument, uploadAttachment } from "fbase";

const DB_NWEETS = "nweets";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        const newNweet = {
            text: nweet,
            createdAt: Date.now(),
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
    );
};

export default NweetFactory;
