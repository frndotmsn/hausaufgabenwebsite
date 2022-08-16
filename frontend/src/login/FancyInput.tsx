import { Component } from "solid-js";

interface Props {
    id: string;
    placeholder: string;
}

const FancyInput: Component<Props> = ({ id, placeholder }) => {


    return (<div>
        <input type="text" id={id} placeholder=" "></input>
        <label for={id}>{placeholder}</label>
    </div>)
}

export default FancyInput;