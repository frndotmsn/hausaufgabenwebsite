import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@ObjectType()
export class Task {
    @Field(() => String)
    @IsNotEmpty()
    id: string;
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
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    verifierId?: string;
    @Field(() => String)
    @IsNotEmpty()
    creatorId: string;
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    updaterId?: string;
}