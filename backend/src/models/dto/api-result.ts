interface APIResult<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const AsSuccessfulAPIResult = <T>(data: T) => {
    return { success: true, data };
};

const AsFailedAPIResult = <T>(message: string) => {
    return { success: true, message };
};

const AsTryAPIResult = <T>(func: (...args: unknown[]) => T, ...args: unknown[]) => {
    try {
        return AsSuccessfulAPIResult(func(...args));
    } catch (error) {
        return AsFailedAPIResult(error.message);
    }
}

const AsAsyncTryAPIResult = async<T>(func: (...args: unknown[]) => Promise<T>, ...args: unknown[]) => {
    try {
        return AsSuccessfulAPIResult(await func(...args));
    } catch (error) {
        return AsFailedAPIResult(error.message);
    }
}

export { APIResult, AsSuccessfulAPIResult, AsFailedAPIResult, AsTryAPIResult, AsAsyncTryAPIResult };