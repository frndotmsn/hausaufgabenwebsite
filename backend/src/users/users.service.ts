import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';
import { UserCreateInput } from './gql/dto/input/user-create.input';
import { UserUpdateInput } from './gql/dto/input/user-update.input';
import prisma from '../prisma';
import * as bcrypt from 'bcrypt';
import { AsAsyncTryAPIResult, AsFailedAPIResult, IAPIResult } from 'src/models/dto/api-result';

@Injectable()
export class UsersService {
    public async getUserByName(name: string): Promise<IAPIResult<User | null>> {
        return await AsAsyncTryAPIResult(prisma.user.findFirst, { where: { name } });
    }

    public async getUser(id: string): Promise<IAPIResult<User | null>> {
        return await AsAsyncTryAPIResult(prisma.user.findFirst, { where: { id } });
    }
    
    public async getUsers(): Promise<IAPIResult<User[]>> {
        return await AsAsyncTryAPIResult(prisma.user.findMany);
    }

    public async createUser(userCreateData: UserCreateInput): Promise<IAPIResult<User>> {
        const hashedPassword = await bcrypt.hash(userCreateData.password, 10);
        const user = { hashedPassword: hashedPassword, name: userCreateData.name, email: userCreateData.email };
        return await AsAsyncTryAPIResult(prisma.user.create, { data: user });
    }
    // TODO: Add authentication with check for admin bc of banning
    public async updateUser(user: User, id: string, userUpdateData: UserUpdateInput): Promise<IAPIResult<User>> {
        if (user.id !== id) {
            return AsFailedAPIResult('You do not have permission to update this user');
        }

        const hashedPassword: string | undefined = userUpdateData.password ? await bcrypt.hash(userUpdateData.password, 10) : undefined
        const userData = { hashedPassword: hashedPassword, name: userUpdateData.name, email: userUpdateData.email };
        return await AsAsyncTryAPIResult(prisma.user.update, { data: userData, where: { id } });
    }

    public async deleteUser(id: string): Promise<IAPIResult<User>> {
        return await AsAsyncTryAPIResult(prisma.user.delete, { where: { id } });
    }

    /* public async validateUserCredentials(email: string, password: string): Promise<User | null> {
        const user = await prisma.user.findFirst({ where: { email } });
     
        if (user == null) return null;
     
        const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!isValidPassword) {
          return null;
        }
     
        return user;
    }

    public async getJWT(user: User): Promise<string> {
        return await this.jwtService.signAsync({ id: user.id });
    } */
}