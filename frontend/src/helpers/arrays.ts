//const groupBy = function<T, K extends keyof any>(list: T[], key: (item: T) => K) {
//    return list.reduce((groups, item) => {
//        if(!groups.has(key(item))) groups.set(key(item), [item]);
//        else groups.get(key(item)).push(item);
//        return groups;
//    }, new Map<K, T[]>);
//}

const groupBy = function<T, K extends keyof any>(list: T[], key: (item: T) => K) {
    const result = new Map<K, T[]>();
    for (const item of list) {
        if(!result.has(key(item))) result.set(key(item), [item]);
        else result.get(key(item)).push(item);
    }
    return result;
}
export { groupBy }