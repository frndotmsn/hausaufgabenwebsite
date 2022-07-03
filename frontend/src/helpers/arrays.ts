const groupBy = function<T, K extends keyof any>(list: T[], key: (item: T) => K) {
    return list.reduce((groups, item) => {
        if(!groups.has(key(item))) groups.set(key(item), [item]);
        else groups.get(key(item)).push(item);
        return groups;
    }, new Map<K, T[]>);
}
export { groupBy }