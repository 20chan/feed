import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./login.css";

const LoginPage: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [id, setId] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ id, password }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (resp.ok) {
            history.push("/");
        } else {
            setPassword("");
        }
    };

    return (
        <div className="login-page">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <div className="unselectable">feed.0ch.me</div>
                    </div>
                    <div className="fields">
                        <input type="text" placeholder="username" className="borderless" value={id} onChange={event => setId(event.target.value)} required />
                        <input type="password" placeholder="password" className="borderless" value={password} onChange={event => setPassword(event.target.value)} required />
                    </div>
                    <button className="borderless">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(LoginPage);
