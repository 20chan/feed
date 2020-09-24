import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Alias } from "./entities";
import "./dashboard.css";
import { AliasForm } from "./components/aliasForm";

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
            return true;
        }
        return false;
    };

    const updateAlias = async (id: string | undefined, alias: Alias) => {
        const resp = await fetch(`/api/aka/alias/${id}`, {
            method: "PUT",
            body: JSON.stringify(alias),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resp.ok) {
            await fetchData();
            return true;
        }
        return false;
    };

    const submitAlias = (alias: string, url: string) => {
        const exists = aliases.find(a => a.alias === alias);
        if (exists === undefined) {
            return addAlias({ alias, url });
        } else {
            return updateAlias(exists.id, { alias, url });
        }
    };

    const deleteAlias = async (id?: string) => {
        const resp = await fetch(`/api/aka/alias/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resp.ok) {
            await fetchData();
            return true;
        }
        return false;
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
                    <AliasForm onSubmit={submitAlias} />
                    <div className="alias-list">
                        {
                            aliases.map(alias =>
                                <div className="alias-item" key={alias.id}>
                                    <div className="alias-id">{alias.id}</div>
                                    <button className="alias-delete" onClick={() => deleteAlias(alias.id)}>X</button>
                                    <div className="item-content">
                                        <div className="alias-alias">
                                            <a href={`/${alias.alias}`}>{alias.alias}</a>
                                        </div>
                                        <div className="alias-url">{alias.url}</div>
                                        <button className="alias-copy" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${alias.alias}`)}>Copy</button>
                                    </div>
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