import React, { useState } from "react";
import { FeedChannel } from "./../entities";
import "./channelSection.css";

export const ChannelSection = ({ channel }: { channel: FeedChannel}) => {
    const [displayCount, setDisplayCount] = useState<number>(10);
    return (
        <section className="channel-section">
            <div className="channel-content">
                <h1 className="channel-header">
                    <a className="channel-title" href={channel.link}>{channel.title}</a>
                </h1>
                <ol className="channel-items">
                {
                    channel.items.map((item, i) =>
                    <li className="channel-item" key={i} style={{ display: (i < displayCount) ? "list-item" : "none2"}}>
                        <a className="channel-item-link" href={item.link} target="_blank" rel="noopener">{item.title}</a>
                    </li>)
                }
                </ol>
            </div>
        </section>
    );
};