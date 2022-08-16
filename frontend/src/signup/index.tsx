import { createSignal } from "solid-js";
import { render, Show } from "solid-js/web";
import FancyInput from "../login/FancyInput";
import UsernamePassword from "../login/UsernamePassword";

const [message, setMessage] = createSignal<string>(undefined);

render(() => (
<>
    <FancyInput id="email" placeholder="Email"/>
    <UsernamePassword />
    <FancyInput id="password-confirm" placeholder="Passwortbestätigung"/>
    <button type="submit" onClick={async () => {
        const x: { success: boolean, data?: string, message?: string } = await (await fetch("/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: (document.getElementById('username') as HTMLInputElement).value,
                password: (document.getElementById('password') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value
            })
        })).json();
        if (x.success) {
            window.location.href = "/";
            localStorage.setItem('refreshToken', x.data);
            return;
        }
        setMessage(x.message);
    }}>Login</button>
    <Show when={message()}>
        <span>{message()}</span>
    </Show>
</>
), document.getElementById('root') as HTMLElement)