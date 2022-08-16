import { Component } from "solid-js";
import FancyInput from "./FancyInput";

const UsernamePassword: Component = () => {
    
    return (
        <div class="username-password">
            <FancyInput id="username" placeholder="Benutzername"/>
            <FancyInput id="password" placeholder="Passwort"/>
        </div>
    );
}

export default UsernamePassword;