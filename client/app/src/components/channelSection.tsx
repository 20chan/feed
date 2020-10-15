import React, { useState } from "react";
import { FeedChannel } from "./../entities";
import "./channelSection.css";

export const ChannelSection = ({ channel }: { channel: FeedChannel}) => {
    const [displayCount, setDisplayCount] = useState<number>(10);

    const addDisplayCount = (offset: number) => {
        setDisplayCount(Math.min(Math.max(displayCount + offset, 0), channel.items.length - 1));
    };

    return (
        <section className="channel-section">
            <div className="channel-content">
                <h1 className="channel-header">
                    <a className="channel-title" href={channel.link}>{channel.name}</a>
                    <div className="channel-header-corner">
                        <button className="channel-display-button channel-display-less-button" onClick={() => addDisplayCount(-10)}>-10</button>
                        <button className="channel-display-button channel-display-more-button" onClick={() => addDisplayCount(+10)}>+10</button>
                    </div>
                </h1>
                <ol className="channel-items">
                {
                    channel.items.map((item, i) =>
                    <li className="channel-item" key={i} style={{ display: (i < displayCount) ? "list-item" : "none"}}>
                        <a className="channel-item-link" href={item.link} target="_blank" rel="noopener">{item.title}</a>
                    </li>)
                }
                </ol>
                <div className="channel-footer">
                    <button className="channel-display-button channel-display-less-button" onClick={() => addDisplayCount(-10)}>-10</button>
                    <button className="channel-display-button channel-display-more-button" onClick={() => addDisplayCount(+10)}>+10</button>
                </div>
            </div>
        </section>
    );
};