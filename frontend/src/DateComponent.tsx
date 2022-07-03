import { Component, Setter } from "solid-js";
import { localeDateStringOptions } from "./constants";

interface DateComponentProps {
    setCurrentDate: Setter<Date>;
    toggleOnVisible: () => void;
    date: Date;
}

const DateComponent: Component<DateComponentProps> = (props) => {
    const handleOnClick = ({ currentTarget }: { currentTarget: HTMLButtonElement }) => {
        const dateString = currentTarget.getAttribute('data-date');
        props.setCurrentDate(new Date(dateString));
        props.toggleOnVisible();
    };
    
    return (
        <button type="button" onclick={handleOnClick} data-date={props.date.toISOString()}>
            {props.date.toLocaleDateString(localeDateStringOptions.locale, localeDateStringOptions.options)}
        </button>
    )
}
export default DateComponent;