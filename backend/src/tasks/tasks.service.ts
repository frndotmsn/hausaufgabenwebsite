import { Injectable } from '@nestjs/common';
import { AsAsyncTryAPIResult, IAPIResult } from 'src/models/dto/api-result';
import { Task } from 'src/models/task';
import prisma from 'src/prisma';
import { TaskCreateInput } from './dto/input/task-create.input';
import { TaskUpdateInput } from './dto/input/task-update.input';

@Injectable()
export class TasksService {
    public async getTask(id: string): Promise<IAPIResult<Task | null>> {
        return await AsAsyncTryAPIResult(prisma.task.findFirst, { where: { id } });
    }
    
    public async getTasks(date: Date, toOrFrom: boolean, verified: boolean): Promise<IAPIResult<Task[]>> {
        return await AsAsyncTryAPIResult(prisma.task.findMany, { where: { ...(toOrFrom ? { dueTo: date} : { issuedAt: date }), verified } });
    }

    public async getDates(): Promise<IAPIResult<Date[]>> {
        return await AsAsyncTryAPIResult(async() => {
            const set = new Set<Date>();
            for (const i of (await prisma.task.findMany({ select: { issuedAt: true, dueTo: true } })))
            {
                set.add(i.issuedAt);
                set.add(i.dueTo);
            }
            return Array.from(set);
        });
    }

    // TODO: check if creator isn't banned
    // TODO: verified & creator based on logged in user
    public async createTask(taskCreateData: TaskCreateInput): Promise<IAPIResult<Task>> {
        const data = { ...taskCreateData, verified: false, creator: { connect: { id: "1" } } }
        return await AsAsyncTryAPIResult(prisma.task.create, { data });
    }

    // TODO: verifier & updater based on logged in user
    public async updateTask(id: string, taskUpdateData: TaskUpdateInput): Promise<IAPIResult<Task>> {
        const data = {
            ...taskUpdateData,
            updatedAt: new Date(Date.now()),
            /* should be changed
            verifier: undefined,
            updater: undefined,*/
            /* should not be changed
            createdAt: undefined,
            creator: undefined*/
        };
        return await AsAsyncTryAPIResult(prisma.task.update, {
            where: { id },
            data
        });
    }

    // TODO: check whether current user has permission to perform the deletion
    public async deleteTask(id: string): Promise<IAPIResult<Task>> {
        return await AsAsyncTryAPIResult(prisma.task.delete, { where: { id } });
    }
}