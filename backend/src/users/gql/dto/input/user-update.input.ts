import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../../../models/role';
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

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
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    banned?: boolean;
    @Field({ nullable: true })
    @IsOptional()
    @IsIn([ 'OWNER', 'ADMIN', 'USER' ])
    role?: Role
}