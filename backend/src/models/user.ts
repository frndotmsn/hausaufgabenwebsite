import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from './role';

@ObjectType()
export class User {
    @Field(() => Int)
    @IsInt()
    id: number;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    hashedPassword: string
    @IsBoolean()
    shouldReauth: boolean
    @IsDate()
    createdAt: Date;
    @IsDate()
    lastLogin: Date;
    @Field()
    @IsNotEmpty()
    name: string;
    @Field()
    @IsBoolean()
    banned: boolean;
    @IsOptional()
    @IsInt()
    bannedById?: number;
    @Field(() => String)
    @IsIn([ 'OWNER', 'ADMIN', 'USER' ])
    role: Role
}