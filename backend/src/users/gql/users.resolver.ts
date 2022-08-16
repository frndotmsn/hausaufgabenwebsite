import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UserUpdateInput } from './dto/input/user-update.input';
import { User } from '../../models/user'
import { UsersService } from '../users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/auth/gql-current-user';

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
    @UseGuards(GqlAuthGuard)
    async updateUser(@CurrentUser() user: User, @Args('id', { type: () => String }) id: string, @Args('updateUserData') userUpdateData: UserUpdateInput): Promise<APIResult<User>> {
        return await this.usersService.updateUser(user, id, userUpdateData);
    }

    @Mutation(() => User)
    async deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}