import { Component, createMemo, Show } from "solid-js";
import { Task } from "./models/Task";
import UserComponent from "./UserComponent";

interface HomeworkTaskProps {
    task: Task;
}

const HomeworkTask: Component<HomeworkTaskProps> = (props) => {
    return (
        <div class="flex justify-between">
            <span>{props.task.title}</span>
            <div class="grid grid-flow-col justify-center">
                <UserComponent name={props.task?.creator?.name} id={props.task.creatorId}/>
                <Show when={props.task.updaterId || props.task.updater}>
                    <UserComponent name={props.task.updater?.name} id={props.task.updaterId} />
                </Show>
            </div>
        </div>
    )
};
export default HomeworkTask;