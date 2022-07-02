import { Injectable } from '@nestjs/common';
import { Task } from 'src/models/task';
import prisma from 'src/prisma';
import { TaskCreateInput } from './dto/input/task-create.input';
import { TaskUpdateInput } from './dto/input/task-update.input';

@Injectable()
export class TasksService {
    public async getTask(id: number): Promise<Task | null> {
        return await prisma.task.findFirst({ where: { id } });
    }
    
    public async getTasks(): Promise<Task[]> {
        return await prisma.task.findMany();
    }

    // TODO: check if creator isn't banned
    // TODO: verified & creator based on logged in user
    public async createTask(taskCreateData: TaskCreateInput): Promise<Task> {
        const data = { ...taskCreateData, verified: false, creator: { connect: { id: 1 } } }
        return await prisma.task.create({ data });
    }

    // TODO: verifier & updater based on logged in user
    public async updateTask(id: number, taskUpdateData: TaskUpdateInput): Promise<Task> {
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
        return await prisma.task.update({
            where: { id },
            data
        });
    }

    // TODO: check whether current user has permission to perform the deletion
    public async deleteTask(id: number): Promise<Task> {
        return await prisma.task.delete({ where: { id } });
    }
}