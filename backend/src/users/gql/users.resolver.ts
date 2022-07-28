import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UserCreateInput } from './dto/input/user-create.input';
import { UserUpdateInput } from './dto/input/user-update.input';
import { User } from '../../models/user'
import { UsersService } from '../users.service';

@Resolver(() => User)
export class UsersGQLResolver {
    constructor(private readonly usersService: UsersService) {}
    
    @Query(() => User, { nullable: true, name: 'user' })
    async getUser(@Args('id', { type: () => String }) id: string): Promise<User | null> {
        return await this.usersService.getUser(id);
    }

    @Query(() => [User], { nullable: 'items', name: 'users' })
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Mutation(() => User)
    async createUser(@Args('userCreateData') userCreateData: UserCreateInput): Promise<User> {
        return await this.usersService.createUser(userCreateData);
    }

    @Mutation(() => User)
    async updateUser(@Args('id', { type: () => String }) id: string, @Args('updateUserData') userUpdateData: UserUpdateInput): Promise<User> {
        return await this.usersService.updateUser(id, userUpdateData);
    }

    @Mutation(() => User)
    async deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}