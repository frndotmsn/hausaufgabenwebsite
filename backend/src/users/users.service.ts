import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';
import { UserCreateInput } from './gql/dto/input/user-create.input';
import { UserUpdateInput } from './gql/dto/input/user-update.input';
import prisma from '../prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    public async getUserByName(name: string): Promise<User | null> {
        return await prisma.user.findFirst({ where: { name } });
    }

    public async getUser(id: string): Promise<User | null> {
        return await prisma.user.findFirst({ where: { id } });
    }
    
    public async getUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    public async createUser(userCreateData: UserCreateInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(userCreateData.password, 10);
        delete userCreateData.password;
        const user = {
            ...userCreateData,
            hashedPassword
        }
        return await prisma.user.create({ data: user});
    }
    // TODO: Add authentication with check for admin bc of banning
    public async updateUser(id: string, userUpdateData: UserUpdateInput): Promise<User> {
        const hashedPassword: string | undefined = userUpdateData.password ? await bcrypt.hash(userUpdateData.password, 10) : undefined
        delete userUpdateData.password;
        return await prisma.user.update({
            where: { id },
            data: { ...userUpdateData, hashedPassword }
        });
    }

    public async deleteUser(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id } });
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