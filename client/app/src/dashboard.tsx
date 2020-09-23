import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Alias } from "./entities";
import "./dashboard.css";

const DashboardPage: React.SFC<RouteComponentProps> = ({ history }) => {
    const [auth, setAuth] = useState<boolean>(false);
    const [aliases, setAliases] = useState<Alias[]>([]);

    useEffect(() => {
        document.title = "aka";
        fetchData().then(() => {
            setAuth(true);
        });
    }, []);

    const fetchData = async () => {
        const aliasResp = await fetch("/api/aka/alias");
        if (aliasResp.ok) {
            setAliases(await aliasResp.json());
        } else {
            history.push("/login");
        }
    };

    const addAlias = async (alias: Alias) => {
        const resp = await fetch("/api/aka/alias", {
            method: "POST",
            body: JSON.stringify(alias),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resp.ok) {
            await fetchData();
        }
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
                        aka.0ch.me
                    </div>
                </div>
                <div className="content-body">
                    <div>
                        {
                            aliases.map(alias =>
                                <div className="alias_item" key={alias.id}>
                                    <div className="alias_id">{alias.id}</div>
                                    <div className="alias_alias">{alias.alias}</div>
                                    <div className="alias_url">{alias.url}</div>
                                </div>)
                        }
                    </div>
                </div>
                <div className="content-footer">
                    <div className="action-button">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(DashboardPage);