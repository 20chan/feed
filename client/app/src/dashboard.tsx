import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Calendar } from "./components/calendar";
import "./dashboard.css";

const DashboardPage: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        fetchData().then(() => {
            setAuth(true);
        });
    }, []);

    const fetchData = async () => {
        const authResp = await fetch("/api/feed/health");
        if (!authResp.ok) {
            history.push("/login");
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
                        feed.0ch.me
                    </div>
                </div>
                <div className="content-body">
                    <section>
                        <Calendar />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default withRouter(DashboardPage);