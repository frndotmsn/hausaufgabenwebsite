import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    password?: string;
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}