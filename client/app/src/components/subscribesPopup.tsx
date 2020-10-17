import React, { useEffect, useState } from "react";
import { ISubscribe } from "./../entities";
import "./subscribesPopup.css";

export const SubscribesPopup = () => {
    const [subscribes, setSubscribes] = useState<ISubscribe[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchSubscribes().then(() => {
            setLoaded(true);
        });
    }, []);

    const fetchSubscribes = async () => {
        const resp = await fetch("/api/feed/subscribes");
        if (!resp.ok) {
            setError(true);
            return;
        }
        setSubscribes(await resp.json());
    };

    const loadingBody = <div className="loading">loading..</div>;

    const errorBody = <div className="error">error fetching subscribes</div>;

    const contentBody = <div className="subscribes-list">
        {
            subscribes.map(s =>
                <div className="subscribe-item" key={s._id}>
                    <div className="subscribe-name">{s.name}</div>
                    <div className="subscribe-type">{s.type}</div>
                    <div className="subscribe-url">{s.url}</div>
                </div>)
        }
    </div>;

    return (
        <div className="subscribes-popup">
            <div className="subscribes-popup-content">
                {
                    (!loaded) ? loadingBody : error ? errorBody : contentBody
                }
            </div>
        </div>
    );
};