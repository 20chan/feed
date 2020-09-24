import React from "react";

interface Props {
    onSubmit: (alias: string, url: string) => Promise<boolean>;
}

export const AliasForm = (props: Props) => {
    const aliasText = React.createRef<HTMLInputElement>();
    const urlText = React.createRef<HTMLInputElement>();
    const [error, setError] = React.useState<boolean>(false);
    const [alias, setAlias] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");

    const onUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    const clear = () => {
        setUrl("");
        setAlias("");
    };

    const submit = async () => {
        if (await props.onSubmit(alias, url)) {
            clear();
        } else {
            setError(true);
            aliasText.current?.focus();
        }
    };

    return (
        <div className="alias-form">
            <input className={error ? "invalid" : ""} ref={aliasText} value={alias} onChange={e => setAlias(e.currentTarget.value)} placeholder="alias" spellCheck="false" />
            <input ref={urlText} value={url} onKeyDown={onUrlKeyDown} onChange={e => setUrl(e.currentTarget.value)} placeholder="url" spellCheck="false" />
            {/* <button onClick={ev => submit()}>Create</button> */}
        </div>
    );
};