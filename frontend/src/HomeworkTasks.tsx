import { Component, createMemo, createSignal, For } from "solid-js"
import { groupBy } from "./helpers/arrays";
import { toNoun } from "./helpers/strings";
import HomeworkSubject from "./HomeworkSubject";
import { Task } from "./models/Task";
import { sameDate } from './helpers/dates'
import ConditionalTextButton from "./ConditionalTextButton";

interface HomeworkTasksProps {
    tasks: Task[];
    currentDate: Date;
}

const HomeworkTasks: Component<HomeworkTasksProps> = (props) => {
    const [to, setTo] = createSignal(true);
    const [verified, setVerified] = createSignal(true);

    const toggleTo = () => setTo(c => !c);
    const toggleVerified = () => setVerified(c => !c);

    const todaysTasks = createMemo(() => props.tasks.filter((task) =>
        sameDate((to() ? task.dueTo : task.issuedAt), props.currentDate) &&
        (!verified() || task.verified)
    ));
    console.log(props.tasks)
    console.log(todaysTasks());

    const taskGroups = createMemo(() => groupBy(todaysTasks(), (task: Task) => toNoun(task.subject)))

    return (
        <main>
            <div class="flex justify-between p-2">
                <ConditionalTextButton
                    onclick={toggleTo}
                    condition={to()}
                    a={'Bis'}
                    b={'Von'} />
                <ConditionalTextButton
                    onclick={toggleVerified}
                    condition={verified()}
                    a={'Nur Verifiziert'}
                    b={'Alle'} />
            </div>
            <ul class="nth-child:bg-gray-200">
                <For each={Array.from(taskGroups())}>{(pair: [string, Task[]]) =>
                    <li class="px-2"><HomeworkSubject subject={pair[0]} tasks={pair[1]} /></li>
                }</For>
            </ul>
        </main>
    );
};
export default HomeworkTasks;