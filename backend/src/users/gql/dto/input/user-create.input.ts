import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserCreateInput {
    @Field()
    @IsEmail()
    email: string;
    @Field()
    @IsNotEmpty()
    password: string;
    @Field()
    @IsNotEmpty()
    name: string;
}