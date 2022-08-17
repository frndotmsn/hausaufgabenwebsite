import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { APIResult, APIResultArray, IAPIResult } from 'src/models/dto/api-result';
import { Task } from 'src/models/task';
import { TaskCreateInput } from './dto/input/task-create.input';
import { TaskUpdateInput } from './dto/input/task-update.input';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) {}

    @Query(() => APIResult(Task), { name: 'task' })
    async getTask(@Args('id', { type: () => String }) id: string): Promise<IAPIResult<Task | null>> {
        return await this.tasksService.getTask(id);
    }

    @Query(() => APIResultArray(Task), { name: 'tasks' })
    async getTasks(@Args('date') date: Date, @Args('toOrFrom') toOrFrom: boolean, @Args('verified') verified: boolean): Promise<IAPIResult<Task[]>> {
        return await this.tasksService.getTasks(date, toOrFrom, verified);
    }

    @Query(() => APIResultArray(Date), { name: 'dates' })
    async getDates(): Promise<IAPIResult<Date[]>> {
        return await this.tasksService.getDates();
    }

    @Mutation(() => APIResult(Task))
    async createTask(@Args('createTaskData') createTaskData: TaskCreateInput): Promise<IAPIResult<Task>> {
        return await this.tasksService.createTask(createTaskData);
    }

    @Mutation(() => APIResult(Task))
    async updateTask(@Args('id', { type: () => String }) id: string, @Args('updateTaskData') updateTaskData: TaskUpdateInput): Promise<IAPIResult<Task>> {
        return await this.tasksService.updateTask(id, updateTaskData);
    }

    @Mutation(() => APIResult(Task))
    async deleteTask(@Args('id', { type: () => String }) id: string): Promise<IAPIResult<Task>> {
        return await this.tasksService.deleteTask(id);
    }
}