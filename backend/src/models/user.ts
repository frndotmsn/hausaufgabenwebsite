import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from './role';

@ObjectType()
export class User {
    @Field(() => String)
    @IsNotEmpty()
    id: string;
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
    @IsNotEmpty()
    bannedById?: string;
    @Field(() => String)
    @IsIn([ 'OWNER', 'ADMIN', 'USER' ])
    role: Role
}