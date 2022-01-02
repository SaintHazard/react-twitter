import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { onDBSnapshot } from "fbase";
import { useEffect, useState } from "react";

const DB_NWEETS = "nweets";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        onDBSnapshot(DB_NWEETS, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setNweets(nweetArray);
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
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
