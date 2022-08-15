import { Component, createMemo, createSignal, For, Setter, Show } from "solid-js";
import { localeDateStringOptions } from "./constants";
import DateComponent from "./DateComponent";

const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' }

interface HeaderComponentProps {
    currentDate: Date;
    setCurrentDate: Setter<Date>;
}

const HeaderComponent: Component<HeaderComponentProps> = (props) => {
    const [weekdaySelectionVisible, setWeekdaySelectionVisible] = createSignal(false);
    const toggleWeekdaySelectionVisible = () => setWeekdaySelectionVisible(c => !c);
    const dayOfCurrentWeek = (offset: number) => new Date(
        props.currentDate.getFullYear(),
        props.currentDate.getMonth(),
        props.currentDate.getDate() - props.currentDate.getDay() + 1 + offset);
    const weekdays = createMemo(() => {
        const dates: Date[] = [];
        for (let i = 0; i < 7; ++i) {
            const date = dayOfCurrentWeek(i);
            if (date.toDateString() !== props.currentDate.toDateString())
                dates.push(date);
        }
        return dates;
    });

    return (
        <>
            <header class="grid p-2 md:p-3 lg:p-4">
                <button class="justify-self-center" onclick={toggleWeekdaySelectionVisible}>
                    {props.currentDate.toLocaleDateString(localeDateStringOptions.locale, localeDateStringOptions.options)}
                </button>
            </header>
            <Show when={weekdaySelectionVisible()}>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center">
                    <For each={weekdays()}>{ (date: Date) =>
                        <div class="w-min">
                            <DateComponent options={options} date={date} setCurrentDate={props.setCurrentDate} toggleOnVisible={toggleWeekdaySelectionVisible}/>
                        </div>
                    }</For>
                </div>
            </Show>
        </>
    );
};
export default HeaderComponent;