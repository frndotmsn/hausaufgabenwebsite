import { Type } from '@nestjs/common';
import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

export interface IAPIResult<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export function APIResult<T extends Type<unknown>>(classRef: T): Type<IAPIResult<T>> {
    @ObjectType({ isAbstract: true })
    abstract class APIResult implements IAPIResult<T> {
        @Field(() => Boolean)
        success: boolean;
        @Field(() => classRef, { nullable: true })
        data?: T;
        @Field(() => String, { nullable: true })
        @IsOptional()
        message?: string;
    }
    return APIResult as Type<IAPIResult<T>>;
}

export function APIResultArray<T extends Type<unknown>>(classRef: T): Type<IAPIResult<T[]>> {
    @ObjectType({ isAbstract: true })
    abstract class APIResult implements IAPIResult<T[]> {
        @Field(() => Boolean)
        success: boolean;
        @Field(() => [classRef], { nullable: 'items' })
        data?: T[];
        @Field(() => String, { nullable: true })
        @IsOptional()
        message?: string;
    }
    return APIResult as Type<IAPIResult<T[]>>;
}

const AsSuccessfulAPIResult = <T>(data: T): IAPIResult<T> => {
    return { success: true, data };
};

const AsFailedAPIResult = <T>(message: string): IAPIResult<T> => {
    return { success: true, message };
};

const AsTryAPIResult = <T>(func: (...args: unknown[]) => T, ...args: unknown[]): IAPIResult<T> => {
    try {
        return AsSuccessfulAPIResult(func(...args));
    } catch (error) {
        return AsFailedAPIResult(error.message);
    }
}

const AsAsyncTryAPIResult = async<T>(func: (...args: unknown[]) => Promise<T>, ...args: unknown[]): Promise<IAPIResult<T>> => {
    try {
        return AsSuccessfulAPIResult(await func(...args));
    } catch (error) {
        return AsFailedAPIResult(error.message);
    }
}

export { AsSuccessfulAPIResult, AsFailedAPIResult, AsTryAPIResult, AsAsyncTryAPIResult };