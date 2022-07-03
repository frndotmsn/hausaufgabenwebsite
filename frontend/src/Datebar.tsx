import { Accessor, Component, createSignal, For, Setter } from "solid-js";
import DateComponent from "./DateComponent";

interface DatebarProps {
    dates: Accessor<Date[]>,
    setCurrentDate: Setter<Date>
}

const Datebar: Component<DatebarProps> = (props) => {
    const [visible, setVisible] = createSignal(false);
    
    const toggleOnVisible = () => setVisible(c => !c);

    return (
        <>
            <div class="fixed grid justify-items-center bottom bottom-0 w-screen h-min z-20">
                <button type="button" onclick={toggleOnVisible} id="toggle-button" class={`transition-all py-3${visible() ? ' toggled' : ''}`}>
                    <img src="/src/svg/arrow.svg" alt="Toggle"/>    
                </button>
            </div>
            <ul class={`fixed bg-white transition-all ${visible() ? 'top-0' : 'top-full'} min-h-screen w-screen z-10 p-2`}>
                <For each={props.dates()}>{(date: Date) => 
                    <li><DateComponent date={date} setCurrentDate={props.setCurrentDate} toggleOnVisible={toggleOnVisible} /></li>
                }</For>
            </ul>
        </>
    );
};
export default Datebar;