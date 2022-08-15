import { OperationVariables, QueryOptions } from '@apollo/client';
import { gql } from '@merged/solid-apollo'
import { Accessor, Component, createMemo, createResource, createSignal, For, Setter, Suspense } from "solid-js";
import { client } from ".";
import { rawArray } from '../helpers/proxies';
import DateComponent from "./DateComponent";

interface DatebarProps {
    currentDate: Date,
    setCurrentDate: Setter<Date>
}

const DateQuery = gql`
query DateQuery {
  dates
}`;

const Datebar: Component<DatebarProps> = (props) => {
    const [dates] = createResource<Date[], QueryOptions<OperationVariables, Date[]>>(
        async () => {const x = (
          await client.query<Date[], OperationVariables>({ query: DateQuery })
        ).data; console.log(x); return x;},
        { initialValue: [], }
    );

    const [visible, setVisible] = createSignal(false);
    
    const toggleOnVisible = () => setVisible(c => !c);

    return (
        <>
            <div class="fixed grid justify-items-center bottom bottom-0 w-screen h-min z-20">
                <button type="button" onclick={toggleOnVisible} id="toggle-button" class={`py-3${visible() ? ' toggled' : ''}`}>
                    <img src="/src/svg/arrow.svg" alt="Toggle"/>    
                </button>
            </div>
            <Suspense fallback={<h1>Dates are currently loading...</h1>}>
                <ul class={`fixed bg-white ${visible() ? 'top-0' : 'top-full'} min-h-screen w-screen z-10 p-2 md:p-3 lg:p-4`}>
                    <For each={rawArray(dates(), "dates").filter(v => (v as unknown as string) !== props.currentDate.toISOString()).map<Date>(x => new Date(x))}>{(date: Date) => 
                        <li><DateComponent date={date} setCurrentDate={props.setCurrentDate} toggleOnVisible={toggleOnVisible} /></li>
                    }</For>
                </ul>
            </Suspense>
        </>
    );
};
export default Datebar;