export function filterByIndexes(array: any, indexes: number[]) {
    return indexes.map(index => array[index]);
}