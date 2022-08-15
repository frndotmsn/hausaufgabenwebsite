import { Accessor, Component, createMemo, createSignal, For, Setter } from "solid-js"
import { groupBy } from "./helpers/arrays";
import { toNoun } from "./helpers/strings";
import HomeworkSubject from "./HomeworkSubject";
import { Task } from "./models/Task";
import { sameDate } from './helpers/dates'
import ConditionalTextButton from "./ConditionalTextButton";

interface HomeworkTasksProps {
    tasks: Task[];
    currentDate: Date;
    to: Accessor<boolean>;
    setTo: Setter<boolean>;
    verified: Accessor<boolean>;
    setVerified: Setter<boolean>;
    refetch: () => void;
}

const HomeworkTasks: Component<HomeworkTasksProps> = (props) => {
    const toggleTo = () => { props.setTo(c => !c); props.refetch(); }
    const toggleVerified = () => { props.setVerified(c => !c); props.refetch();}

    const taskGroups = createMemo(() => groupBy(props.tasks, (task: Task) => toNoun(task.subject)))

    return (
        <main>
            <div class="flex justify-between py-2 px-2 md:px-3 lg:px-10">
                <ConditionalTextButton
                    onclick={toggleTo}
                    condition={props.to()}
                    a={'Bis'}
                    b={'Von'} />
                <ConditionalTextButton
                    onclick={toggleVerified}
                    condition={props.verified()}
                    a={'Nur Verifiziert'}
                    b={'Alle'} />
            </div>
            <ul class="nth-child:bg-gray-200">
                <For each={Array.from(taskGroups())}>{(pair: [string, Task[]]) =>
                    <li class="px-2 md:px-3 lg:px-10"><HomeworkSubject subject={pair[0]} tasks={pair[1]} /></li>
                }</For>
            </ul>
        </main>
    );
};
export default HomeworkTasks;