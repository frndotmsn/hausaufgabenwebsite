import { ApolloProvider } from "@merged/solid-apollo";
import { render, Suspense } from "solid-js/web";
import { client } from "../client";
import UsernamePassword from "./UsernamePassword";

render(() => (
<>
    <UsernamePassword />
    <button type="submit" onClick={async () => {
        const x: { success: boolean, data: string } = await (await fetch("/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: (document.getElementById('username') as HTMLInputElement).value,
                password: (document.getElementById('password') as HTMLInputElement).value
            })
        })).json();
        if (x.success) {
            window.location.href = "/";
            localStorage.setItem('refreshToken', x.data);
            return;
        }
        alert("Some error occurred. Details: " + JSON.stringify(x));
    }}>Login</button>
</>
), document.getElementById('root') as HTMLElement)