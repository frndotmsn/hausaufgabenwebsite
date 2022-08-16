interface APIResult<T> {
    success: boolean;
    data?: T;
    message?: string;
}