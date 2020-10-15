import * as React from "react";
import { FeedChannel } from "./../entities";
import "./channelSection.css";

export const ChannelSection = ({ channel }: { channel: FeedChannel}) => {
    return (
        <section className="channel-section">
            <div className="channel-content">
                <ol className="channel-items">
                {
                    channel.items.map(item =>
                    <li key={item._id}>
                        <a className="channel-item-link" href={item.link} target="_blank" rel="noopener">{item.title}</a>
                    </li>)
                }
                </ol>
            </div>
        </section>
    );
};