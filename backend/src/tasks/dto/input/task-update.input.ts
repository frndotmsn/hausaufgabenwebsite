import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class TaskUpdateInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    issuedAt: Date;
    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    dueTo?: Date;
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(32)
    subject?: string;
    @Field({ nullable: true })
    @IsOptional()
    @IsNotEmpty()
    title?: string;
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    verified?: boolean;
}