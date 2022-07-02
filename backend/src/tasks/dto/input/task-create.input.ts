import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class TaskCreateInput {
    @Field()
    @IsDate()
    issuedAt: Date;
    @Field()
    @IsDate()
    dueTo: Date;
    @Field()
    @IsNotEmpty()
    @MaxLength(32)
    subject: string;
    @Field()
    @IsNotEmpty()
    title: string;
}