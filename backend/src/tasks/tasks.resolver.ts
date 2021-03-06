import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from 'src/models/task';
import { TaskCreateInput } from './dto/input/task-create.input';
import { TaskUpdateInput } from './dto/input/task-update.input';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) {}

    @Query(() => Task, { nullable: true, name: 'task' })
    async getTask(@Args('id', { type: () => String }) id: string): Promise<Task | null> {
        return await this.tasksService.getTask(id);
    }

    @Query(() => [Task], { nullable: 'items', name: 'tasks' })
    async getTasks(): Promise<Task[]> {
        return await this.tasksService.getTasks();
    }

    @Mutation(() => Task)
    async createTask(@Args('createTaskData') createTaskData: TaskCreateInput): Promise<Task> {
        return await this.tasksService.createTask(createTaskData);
    }

    @Mutation(() => Task)
    async updateTask(@Args('id', { type: () => String }) id: string, @Args('updateTaskData') updateTaskData: TaskUpdateInput): Promise<Task> {
        return await this.tasksService.updateTask(id, updateTaskData);
    }

    @Mutation(() => Task)
    async deleteTask(@Args('id', { type: () => String }) id: string): Promise<Task> {
        return await this.tasksService.deleteTask(id);
    }
}