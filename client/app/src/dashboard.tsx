import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IFeedChannel, IFeedChannelConfig, IFeedItem } from "./entities";
import "./dashboard.css";
import { ChannelSection } from "./components/channelSection";

const DashboardPage: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [auth, setAuth] = useState<boolean>(false);
    const [channels, setChannels] = useState<IFeedChannel[]>([]);

    useEffect(() => {
        fetchChannels().then(() => {
            setAuth(true);
        });
    }, []);

    const fetchChannels = async () => {
        const channelsResp = await fetch("/api/feed/feeds");
        if (!channelsResp.ok) {
            history.push("/login");
            return;
        }
        const fetchedChannels: IFeedChannel[] = await channelsResp.json();
        const channesWithItems = await Promise.all(fetchedChannels.map(async c => ({
                ...c,
                items: (await fetchItem(c._id!)).reverse(),
        })));
        setChannels(channesWithItems);
    };

    const fetchItem = async (id: string): Promise<IFeedItem[]> => {
        const resp = await fetch(`/api/feed/feeds/${id}/items`);
        if (!resp.ok) {
            throw new Error(`fetch item ${id} failed`);
        }
        return await resp.json();
    };

    const logout = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const resp = await fetch("/api/auth/logout", {
            method: "GET",
        });
        if (resp.ok) {
            history.push("/login");
        }
    };

    if (!auth) {
        return (
            <div className="loading">
                <em>loading...</em>
            </div>
        );
    }
    return (
        <div className="page">
            {/* <button onClick={logout}>logout</button> */}
            <div className="content">
                <div className="content-header">
                    <div className="title unselectable">
                        feed.0ch.me
                    </div>
                </div>
                <div className="content-body">
                    <div className="channels">
                        {
                            channels.map(c => <ChannelSection channel={c} key={c._id} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(DashboardPage);