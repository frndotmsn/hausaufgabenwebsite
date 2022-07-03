import { Component } from "solid-js";
import { User } from "./models/user";

type UserComponentProps = { name?: string, id: number }

const UserComponent: Component<UserComponentProps> = (props) => {
    return (
        <span>{props?.name || `Benutzer ${props.id}`}</span>
    )
};
export default UserComponent;