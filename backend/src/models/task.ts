import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@ObjectType()
export class Task {
    @Field(() => Int)
    @IsInt()
    id: number;
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
    @Field()
    @IsBoolean()
    verified: boolean;
    @Field()
    @IsDate()
    createdAt: Date;
    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    verifierId?: number;
    @Field()
    @IsInt()
    creatorId: number;
    @Field({ nullable: true })
    @IsOptional()
    @IsInt()
    updaterId?: number;
}