import { Accessor, Component } from "solid-js";
import { localeDateStringOptions } from "./constants";

interface HeaderComponentProps {
    currentDate: Accessor<Date>;
}

const HeaderComponent: Component<HeaderComponentProps> = (props) => {
    return (
        <header class="grid p-2 md:p-3 lg:p-4">
            <button class="justify-self-center">
                {props.currentDate().toLocaleDateString(localeDateStringOptions.locale, localeDateStringOptions.options)}
            </button>
        </header>
    );
};
export default HeaderComponent;