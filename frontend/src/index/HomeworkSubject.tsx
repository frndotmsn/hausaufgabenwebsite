import { Component, For } from "solid-js";
import HomeworkTask from "./HomeworkTask";
import { Task } from "../models/Task";

interface HomeworkSubjectProps {
    subject: string,
    tasks: Task[]
}

const HomeworkSubject: Component<HomeworkSubjectProps> = (props) => {
    return (
        <>
            <span>{props.subject}</span>
            <ul>
                <For each={props.tasks}>{(task: Task) => 
                    <li><HomeworkTask task={task} /></li>
                }</For>
            </ul>
        </>
    );
};
export default HomeworkSubject