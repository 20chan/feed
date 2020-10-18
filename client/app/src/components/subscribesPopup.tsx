import React, { useEffect, useState } from "react";
import { ISubscribe } from "./../entities";
import "./subscribesPopup.css";

interface Props {
    show: boolean;
    setShow: (value: boolean) => void;
}

export const SubscribesPopup = ({ show, setShow }: Props) => {
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

    const visibleClass = show ? "show" : "hidden";

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
        <div className={`subscribes-popup ${visibleClass}`}>
            <div className="subscribes-popup-content">
                <div className="popup-title unselectable">
                    Subscribes
                </div>
                {
                    (!loaded) ? loadingBody : error ? errorBody : contentBody
                }
                <button className="popup-close" onClick={() => setShow(false)}>close</button>
            </div>
        </div>
    );
};