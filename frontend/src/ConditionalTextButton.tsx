import { Component, JSX } from "solid-js";

interface ConditionalTextButtonProps {
    onclick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    condition: boolean;
    a: string;
    b: string;
}

const ConditionalTextButton: Component<ConditionalTextButtonProps> = (props) => {
    return (
        <button type="button" onclick={props.onclick}>{props.condition ? props.a : props.b}</button>
    );
};
export default ConditionalTextButton;